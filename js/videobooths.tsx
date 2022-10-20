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

const Videobooth = ({ roomName, userName, onRoomEmpty }) => {
  const apiRef = useRef<JitsiApi | null>(null);
  useEffect(() => {
    apiRef.current?.executeCommand("displayName", userName);
  }, [userName]);

  const assertRoomStillFull = useMemo(
    () => () => {
      if (!apiRef.current) return;
      if (apiRef.current.getNumberOfParticipants() < 2) {
        onRoomEmpty();
      }
    },
    [onRoomEmpty, apiRef]
  );

  return (
    <>
      <JitsiMeeting
        key={roomName}
        roomName={roomName}
        configOverwrite={{
          startWithAudioMuted: true,
          prejoinPageEnabled: false,
        }}
        getIFrameRef={(iframe) => (iframe.style.height = "80vh")}
        onApiReady={(_api: IJitsiMeetExternalApi) => {
          const api = _api as JitsiApi;
          apiRef.current = api;
          configureTileViewDefault(api);
          api.executeCommand("displayName", userName || "FELLOW CODERETREAT");
          api.on("passwordRequired", (e) => {
            api.executeCommand("password", SECRET_PASSWORD);
          });
          api.on("videoConferenceJoined", (e) => {
            api.executeCommand("password", SECRET_PASSWORD);
            assertRoomStillFull();
          });
          api.on("participantJoined", assertRoomStillFull);
          api.on("participantLeft", assertRoomStillFull);
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
    </>
  );
};

const ROOMS = new Array(10)
  .fill(undefined)
  .map((_, i) => `gdcr_videobooth_${i + 1}`);

const App = () => {
  const [isRunning, setRunning] = useState(false);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(0);
  const [autoSwitch, setAutoSwitch] = useState(false);

  const maybeAutoswitch = useMemo(
    () => () => {
      if (autoSwitch) {
        window.setTimeout(() => {
          setRoom((room + 1) % ROOMS.length);
        }, 1000);
      }
    },
    [autoSwitch, room]
  );

  return (
    <>
      <div className="alert alert-danger">
        <b>Ask your participants for consent!</b> Not everyone consents to their
        picture being broadcasted to the world. We recommend you let people{" "}
        <b>opt-in</b> to being on camera by pointing the camera at only a
        portion of the room.
      </div>
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

      {isRunning && (
        <Videobooth
          roomName={ROOMS[room]}
          userName={username}
          onRoomEmpty={maybeAutoswitch}
        />
      )}
      <div className="alert alert-warning mt-2">
        The rooms have been protected with the password{" "}
        <code>{SECRET_PASSWORD}</code> in order to avoid Zoom bombing. Please do
        not share the meeting and this password, but this page instead.
      </div>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("videobooths")).render(<App />);
