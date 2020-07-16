import { render, h } from "preact";
import { useState, useEffect } from "preact/hooks";
import * as qs from "qs";
import classNames from "classnames";
import { OPERATING_SYSTEMS, LANGUAGES } from "./guides/metadata";

const SelectionButton = ({ image, text, className, ...buttonProps }) => (
  <button
    className={classNames("btn btn-outline-primary text-dark m-2", className)}
    {...buttonProps}
  >
    <img class="m-2" src={image} style={{ height: 52, width: 52 }} />
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

  return (
    <div className="row">
      <div class="col-12 col-md-6">
        <h4>Operating System</h4>
        {Object.entries(OPERATING_SYSTEMS).map(([key, os]) => (
          <SelectionButton
            image={os.icon}
            text={os.name}
            key={key}
            className={{ active: key === selectedOperatingSystem }}
            onClick={() => {
              selectOperatingSystem(key);
              selectLanguage(null);
            }}
          />
        ))}
      </div>
      <div class="col-12 col-md-6">
        <h4>Programming Language</h4>
        {Object.entries(LANGUAGES).map(([key, language]) => (
          <SelectionButton
            image={language.icon}
            text={language.name}
            disabled={!isLanguageAvailable(key)}
            className={{ active: key === selectedLanguage }}
            onClick={() => {
              selectLanguage(key);
              onSelectionChanged({
                language: key,
                os: selectedOperatingSystem,
              });
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

const Guides = ({ setupSteps, availableGuides }) => {
  const [selectedGuideId, setSelectedGuideId] = useState(
    operatingSystemAndLanguageFromUrl
  );
  const selectedGuide =
    selectedGuideId &&
    availableGuides.find(
      ({ os, language }) =>
        selectedGuideId.os === os && selectedGuideId.language === language
    );

  const stepsForSelectedGuide = selectedGuide?.steps.map((stepId) =>
    setupSteps.find(({ slug }) => slug === stepId)
  );

  useEffect(() => {
    if (selectedGuideId == null) return;
    window.history.pushState(
      {},
      null,
      "?" +
        qs.stringify({
          os: selectedGuideId.os,
          language: selectedGuideId.language,
        })
    );
  }, [selectedGuideId]);

  return (
    <div>
      <GuideSelector
        selectedGuideId={selectedGuideId}
        availableGuides={availableGuides}
        onSelectionChanged={setSelectedGuideId}
      />
      <p>
        Your setup isn't covered here? Check out the{" "}
        <a href="https://github.com/swkBerlin/kata-bootstraps">
          kata-bootstraps
        </a>{" "}
        repository for boilerplates in a lot of different languages!
      </p>
      <hr />
      {stepsForSelectedGuide &&
        stepsForSelectedGuide.map((s) => (
          <div dangerouslySetInnerHTML={{ __html: s?.output }}></div>
        ))}
    </div>
  );
};

(window || global).initializeGuide = ({ setupSteps, availableGuides }) => {
  render(
    <Guides setupSteps={setupSteps} availableGuides={availableGuides} />,
    document.querySelector("#guides")
  );
};
