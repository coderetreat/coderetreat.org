import React, { useRef, useState, useEffect, useMemo } from "react";
import EventEmitter from "events";
import ReactDOM from "react-dom/client";
import { JitsiMeeting } from "@jitsi/react-sdk";
import type { IJitsiMeetExternalApi } from "@jitsi/react-sdk/lib/types";

type JitsiApi = IJitsiMeetExternalApi & EventEmitter.EventEmitter;

const SECRET_PASSWORD = "gdcr_videobooths_secret_password_pssst";

const configureTileViewDefault = (api) => {
  api.on(`videoConferenceJoined`, () => {
    const listener = ({ enabled }) => {
      if (!enabled) {
        api.executeCommand(`toggleTileView`);
      }
    };

    api.once(`tileViewChanged`, listener);
    api.executeCommand(`toggleTileView`);
  });
};

const Videobooth = ({
  roomName,
  userName,
  onRoomEmpty,
  onIframeInitialized,
}) => {
  const apiRef = useRef<JitsiApi | null>(null);
  useEffect(() => {
    apiRef.current?.executeCommand("displayName", userName);
  }, [userName]);

  const roomStillFullTimeout = useRef<number | null>(null);
  const numberOfParticipants = useRef<number>(0);

  const assertRoomStillFull = useMemo(
    () => () => {
      console.log("AutoSwitch", "AssertRoomStillFull");
      if (roomStillFullTimeout.current) {
        console.log("AutoSwitch", "Clearing Timeout");
        window.clearTimeout(roomStillFullTimeout.current);
        roomStillFullTimeout.current = null;
      }
      roomStillFullTimeout.current = window.setTimeout(() => {
        roomStillFullTimeout.current = null;

        if (!apiRef.current) return;
        console.log(
          "AutoSwitch",
          "Number of Participants",
          apiRef.current.getNumberOfParticipants(),
          "Actual",
          numberOfParticipants.current
        );
        if (numberOfParticipants.current < 2) {
          console.log(
            "AutoSwitch",
            "Calling onRoomEpty",
            apiRef.current.getNumberOfParticipants(),
            "Actual",
            numberOfParticipants.current
          );
          onRoomEmpty();
        }
      }, 5000);
    },
    [onRoomEmpty, apiRef, roomStillFullTimeout]
  );

  return (
    <div style={{ height: "90vh", width: "100vw", backgroundColor: "#474747" }}>
      <JitsiMeeting
        domain="jitsi.riot.im"
        key={roomName}
        roomName={roomName}
        configOverwrite={{
          startWithAudioMuted: true,
          prejoinPageEnabled: false,
          prejoinConfig: {
            enabled: false
          }
        }}
        getIFrameRef={(iframe) => {
          iframe.style.height = "100%";
          iframe.style.width = "100%";
          onIframeInitialized && onIframeInitialized();
        }}
        onApiReady={(_api: IJitsiMeetExternalApi) => {
          numberOfParticipants.current = 0;
          const api = _api as JitsiApi;
          apiRef.current = api;
          configureTileViewDefault(api);
          api.executeCommand("displayName", userName || "FELLOW CODERETREAT");
          api.on("passwordRequired", (e) => {
            api.executeCommand("password", SECRET_PASSWORD);
          });
          api.on("videoConferenceJoined", (e) => {
            api.executeCommand("password", SECRET_PASSWORD);
            numberOfParticipants.current += 1;
            assertRoomStillFull();
            console.log("AutoSwitch", "videoConferenceJoined", e);
          });
          api.on("participantJoined", (e) => {
            numberOfParticipants.current += 1;
            console.log("AutoSwitch", "participantJoined", e);
            assertRoomStillFull();
          });
          api.on("participantLeft", (e) => {
            numberOfParticipants.current -= 1;
            console.log("AutoSwitch", "participantLeft", e);
            assertRoomStillFull();
          });
        }}
        interfaceConfigOverwrite={{
          SHOW_JITSI_WATERMARK: false,
          DEFAULT_REMOTE_DISPLAY_NAME: "Fellow Coderetreat",
          SHOW_PROMOTIONAL_CLOSE_PAGE: false,
          SHOW_BRAND_WATERMARK: false,
          SHOW_POWERED_BY: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          TOOLBAR_BUTTONS: [
            "microphone",
            "camera",
            "closedcaptions",
            "desktop",
            "fullscreen",
            "fodeviceselection",
            "hangup",
            "chat",
            "settings",
            "videoquality",
            "filmstrip",
            "shortcuts",
            "tileview",
          ],
        }}
      />
    </div>
  );
};

const ROOMS = new Array(5)
  .fill(undefined)
  .map((_, i) => `gdcr_videobooth_${i + 1}`);

const App = () => {
  const [isRunning, setRunning] = useState(false);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(0);
  const [autoSwitch, setAutoSwitch] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const autoSwitchRef = useRef<boolean>(false);

  const maybeAutoswitch = useMemo(
    () => () => {
      if (autoSwitchRef.current) {
        setRoom((room + 1) % ROOMS.length);
      }
    },
    [room]
  );

  useEffect(() => {
    console.log("AutoSwitch", autoSwitch);
    autoSwitchRef.current = autoSwitch;
  }, [autoSwitch]);

  const scrollToContainer = useMemo(
    () => () => {
      containerRef.current?.scrollIntoView({ behavior: "smooth" });
    },
    [containerRef]
  );

  return (
    <>
      <div className="container py-2" ref={containerRef}>
        <form
          className="form-inline mb-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!isRunning) setRunning(true);
            return false;
          }}
        >
          <label className="sr-only" htmlFor="userName">
            Your Location/Username
          </label>
          <input
            type="text"
            className="form-control"
            id="userName"
            placeholder="Location/Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="input-group ml-sm-2">
            <div className="input-group-prepend">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => setRoom((room + 10 - 1) % ROOMS.length)}
              >
                Previous
              </button>
            </div>
            <select
              className="form-control"
              value={room}
              onChange={(e) => setRoom(Number(e.target.value))}
            >
              {ROOMS.map((room, i) => (
                <option key={room} value={i}>
                  #{room}
                </option>
              ))}
            </select>
            <div className="input-group-append">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => setRoom((room + 1) % ROOMS.length)}
              >
                Next
              </button>
            </div>
          </div>
          <div className="form-check ml-sm-2">
            <input
              className="form-check-input"
              type="checkbox"
              checked={autoSwitch}
              onChange={(e) => setAutoSwitch(!autoSwitch)}
              id="autoSwitchRoom"
            />
            <label className="form-check-label" htmlFor="autoSwitchRoom">
              Auto-Switch room when empty
            </label>
          </div>
          <button
            type="button"
            className="ml-sm-2 btn btn-primary"
            onClick={() => setRunning(!isRunning)}
          >
            {!isRunning ? "Start" : "Stop"}
          </button>
        </form>
      </div>

      {isRunning && (
        <Videobooth
          roomName={ROOMS[room]}
          userName={username}
          onIframeInitialized={scrollToContainer}
          onRoomEmpty={maybeAutoswitch}
        />
      )}
      <div className="container">
        <div className="small">
          The rooms have been protected with the password{" "}
          <code>{SECRET_PASSWORD}</code> in order to avoid Zoom bombing. Please
          do not share the meeting and this password, but this page instead.
        </div>
      </div>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("videobooths")).render(<App />);
