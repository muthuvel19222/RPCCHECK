import './App.css';
import WebSocketConnection from "wslink/src/WebsocketConnection";
import React, { useEffect, useState } from 'react';

function App() {

  const [session, setSession] = useState(null)

  useEffect(() => {
    const ws = WebSocketConnection.newInstance({
      // eslint-disable-next-line no-undef
      urls: "ws://20.114.156.29:8080/ws",
      secret: "SZffOCbfzVnChFhS118v22hc0OkGziUI7Fg980"
    });
    ws.onConnectionError(() => {
      console.log("error showing");
    });

    ws.onConnectionClose(() => {
    });
    ws.onConnectionReady(() => {
      setSession(ws.getSession())
    });
    ws.connect();
  })

  const handleRPCCalls = async () => {
    if (session !== null) {
      var arr = []
      var count = 0
      for (let i = 0; i < 1000; i++) {
        var data1 = new Date().getTime()
        await session.call("tmcmf.api.set.transferfunction", ["-964365920", "Cranium_Viewer_3D", "osteotomies", "bone"]).then((res) => {
          // await session.call("tmcmf.api.get.modellist", ["-964365920", "Cranium_Viewer_3D", "osteotomies"]).then((res) => {
          var data2 = new Date().getTime()
          console.log("getPlan List", res)
          console.log(data2 - data1)
          count = count + data2 - data1
          arr.push({ num: i + 1, seconds: data2 - data1 })
        })
      }
      let average = (count / 1000) / 1000
      console.log("totol of milliseconds", count)
      console.log("average of second", average)
      console.log(JSON.stringify(arr))

    }
  }
  return (
    <div>
      <button onClick={handleRPCCalls}>click</button>
    </div>
  );
}

export default App;
