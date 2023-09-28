import classNames from "classnames";
import * as qs from "qs";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { LANGUAGES, OPERATING_SYSTEMS } from "./guides/metadata";

const SelectionButton = ({ image, text, className, ...buttonProps }) => (
  <button
    className={classNames(
      "btn btn-outline-primary btn-disabled-grayscale text-dark m-2",
      className
    )}
    {...buttonProps}
  >
    <img className="m-2" src={image} style={{ height: 52, width: 52 }} />
    <span className="d-block text-center">{text}</span>
  </button>
);

const useToggle = (initialValue) => {
  const [state, set] = useState(initialValue);

  return [
    state,
    (value) => {
      if (value === state) return set(null);
      return set(value);
    },
  ];
};

const GuideSelector = ({
  availableGuides,
  selectedGuideId,
  onSelectionChanged,
}) => {
  const [selectedOperatingSystem, selectOperatingSystem] = useToggle(
    selectedGuideId?.os
  );
  const [selectedLanguage, selectLanguage] = useToggle(
    selectedGuideId?.language
  );

  const isLanguageAvailable = (languageToShow) => {
    if (selectedOperatingSystem === null) return false;
    return availableGuides.some(
      ({ os, language }) =>
        os === selectedOperatingSystem && language === languageToShow
    );
  };

  useEffect(() => {
    if (
      selectedLanguage &&
      selectedOperatingSystem &&
      (selectedLanguage != selectedGuideId?.language ||
        selectedOperatingSystem != selectedGuideId?.os)
    ) {
      onSelectionChanged({
        language: selectedLanguage,
        os: selectedOperatingSystem,
      });
    }
  }, [selectedLanguage, selectedOperatingSystem]);

  return (
    <div className="">
      <div className="d-block">
        <h4>Operating System</h4>
        {Object.entries(OPERATING_SYSTEMS).map(([key, os]) => (
          <SelectionButton
            image={os.icon}
            text={os.name}
            key={key}
            className={{ active: key === selectedOperatingSystem }}
            onClick={(e) => {
              e.target.blur();
              selectOperatingSystem(key);
              selectLanguage(null);
            }}
          />
        ))}
      </div>
      <div className="mt-3">
        <h4>Programming Language</h4>
        {Object.entries(LANGUAGES).map(([key, language]) => (
          <SelectionButton
            image={language.icon}
            text={language.name}
            disabled={!isLanguageAvailable(key)}
            className={{ active: key === selectedLanguage }}
            onClick={(e) => {
              e.target.blur();
              selectLanguage(key);
            }}
            key={key}
          />
        ))}
      </div>
    </div>
  );
};

const operatingSystemAndLanguageFromUrl = () => {
  const urlParams = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  if (urlParams.os && urlParams.language) {
    return { os: String(urlParams.os), language: String(urlParams.language) };
  }
  return null;
};

const updateUrlFromOperatingSystemAndLanguage = (selectedGuideId) => {
  window.history.pushState(
    {},
    null,
    "?" +
      qs.stringify({
        os: selectedGuideId.os,
        language: selectedGuideId.language,
      })
  );
};

const Resources = ({ resources }) => (
  <div className="tldr mt-0">
    <ul className="">
      {resources.map((resource) => {
        if (resource.type === "url") {
          return (
            <li>
              <span>{resource.description}</span>
              <br />
              <a href={resource.url}>{resource.url}</a>
            </li>
          );
        } else if (resource.type === "shell") {
          return (
            <li>
              <span>{resource.description}</span>
              <br />
              <pre className="d-block bg-dark text-light p-1 mr-1">
                <code>{resource.command}</code>
              </pre>
            </li>
          );
        }
        return <li>{resource.description}</li>;
      })}
    </ul>
  </div>
);

const Video = ({ video }) => (
  <>
    <video
      style={{ width: "100%" }}
      controls
      className="mb-2 drop-shadow-small"
      preload="none"
      poster={video.poster}
      src={video.src}
    ></video>
    <span className="text-center d-block small">{video.description}</span>
  </>
);

const Guide = ({ guide, steps, containerRef }) => {
  return (
    <div ref={containerRef} className="mt-5">
      <div className="px-3 px-lg-5 py-5">
        <h1 className="display-4">{guide.name}</h1>
        <div className="toc d-inline-block p-md-3 my-3">
          <h4 className="h4">Table of Contents</h4>
          <ol className="section-nav">
            {steps.map((s) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`}>{s.title}</a>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <section className="content setup-guide">
        {steps.map((s) => (
          <div className="px-3 px-lg-5 py-5">
            <h2 className="h1 mt-0 mb-5">
              <a name={s.slug}>{s.title}</a>
            </h2>

            <div className="row">
              <div className="col-12 order-2 order-lg-1 col-lg-6">
                {s.resources && <Resources resources={s.resources} />}
                <div dangerouslySetInnerHTML={{ __html: s?.output }}></div>
              </div>
              <div className="col-12 order-1 order-lg-2 col-lg-6 mb-5 mb-lg-0">
                <div className="videos">
                  {s.video &&
                    (Array.isArray(s.video) ? (
                      s.video.map((video) => <Video video={video} />)
                    ) : (
                      <Video video={s.video} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

const Guides = ({ setupSteps, availableGuides }) => {
  const [manualSelection, setIsManualSelection] = useState(false);
  const [selectedGuideId, setSelectedGuideId] = useState(
    operatingSystemAndLanguageFromUrl
  );

  const selectedGuide =
    selectedGuideId &&
    availableGuides.find(
      ({ os, language }) =>
        selectedGuideId.os === os && selectedGuideId.language === language
    );

  const stepsForSelectedGuide = selectedGuide?.steps.map(
    (stepId) =>
      setupSteps.find(({ slug }) => slug === stepId) || {
        slug: stepId,
        title: stepId,
        output: "MISSING",
      }
  );

  useEffect(() => {
    if (selectedGuideId == null || !manualSelection) return;
    updateUrlFromOperatingSystemAndLanguage(selectedGuideId);
  }, [selectedGuideId]);

  const guideRef = useRef(null);
  useLayoutEffect(() => {
    if (guideRef.current === null) return;
    guideRef.current.scrollIntoView({ behavior: "smooth" });
  }, [guideRef, selectedGuideId]);

  const selectGuideAndScrollIntoView = (guideId) => {
    setIsManualSelection(true);
    setSelectedGuideId(guideId);
  };

  return (
    <div className="px-0 my-5 guide">
      <div className="px-3 px-lg-5">
        <h1 className="display-1 display-4-md">Setup Guides</h1>
        <p className="lead">
          Setting up a modern development environment is difficult. Check out
          our guides on how to get your device ready for a coderetreat!
        </p>
      </div>
      <div className="px-3 px-lg-5">
        <GuideSelector
          selectedGuideId={selectedGuideId}
          availableGuides={availableGuides}
          onSelectionChanged={selectGuideAndScrollIntoView}
        />
        <p>
          Your setup isn't covered here? Check out the{" "}
          <a href="https://github.com/swkBerlin/kata-bootstraps">
            kata-bootstraps
          </a>{" "}
          repository for boilerplates in a lot of different languages, or add
          your guide (💙) by submitting a{" "}
          <a href="https://github.com/coderetreat/coderetreat">Pull Request</a>!
        </p>
        <p className="small text-muted">
          <strong>Disclaimer:&nbsp;</strong>While we took a lot of caution with
          compiling these guides, we are not liable for any damages caused by
          following these guides. The guides are provided "AS IS" and free of
          charge.
        </p>
      </div>
      {selectedGuide && (
        <Guide
          containerRef={guideRef}
          guide={selectedGuide}
          steps={stepsForSelectedGuide}
        />
      )}
    </div>
  );
};

const initializeGuide = ({ setupSteps, availableGuides }) => {
  ReactDOM.createRoot(document.getElementById("guides")).render(
    <Guides setupSteps={setupSteps} availableGuides={availableGuides} />
  );

  window.addEventListener("DOMContentLoaded", () => {
    if (!window.location.hash) return;
    window.setTimeout(() => {
      const elem = document.querySelector(
        `${window.location.hash}, [name="${window.location.hash.substring(1)}"]`
      );
      if (!elem) return;
      elem.scrollIntoView({ behavior: "smooth" });
    }, 100);
  });
};
(window || global).initializeGuide = initializeGuide;

export { initializeGuide };
