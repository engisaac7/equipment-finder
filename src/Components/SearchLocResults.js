import { React, useState, useEffect } from "react";
import { db } from "../firebase";
import { query, where, collection, onSnapshot } from "firebase/firestore";
import ResultBoxTest from "./ResultBox";

const SearchLocResults = () => {
  const [backResults, setBackResults] = useState([]);
  const [legsResults, setLegsResults] = useState([]);
  const [chestResults, setChestResults] = useState([]);
  const [armsResults, setArmsResults] = useState([]);
  const [glutesResults, setGlutesResults] = useState([]);
  const [multipurposeResults, setMultipurposeResults] = useState([]);
  const [shouldersResults, setShouldersResults] = useState([]);
  const [coreResults, setCoreResults] = useState([]);

  const colRef = collection(db, "equipment");
  useEffect(() => {
    const q = query(
      colRef,
      where("location", "==", sessionStorage.getItem("locresult"))
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const backItems = [];
      const legsItems = [];
      const chestItems = [];
      const armsItems = [];
      const glutesItems = [];
      const multipurposeItems = [];
      const shouldersItems = [];
      const coreItems = [];

      querySnapshot.forEach((doc) => {
        if (doc.data().target === "Back") {
          backItems.push(doc.data());
        } else if (doc.data().target === "Legs") {
          legsItems.push(doc.data());
        } else if (doc.data().target === "Chest") {
          chestItems.push(doc.data());
        } else if (doc.data().target === "Arms") {
          armsItems.push(doc.data());
        } else if (doc.data().target === "Glutes") {
          glutesItems.push(doc.data());
        } else if (doc.data().target === "Multipurpose") {
          multipurposeItems.push(doc.data());
        } else if (doc.data().target === "Shoulders") {
          shouldersItems.push(doc.data());
        } else if (doc.data().target === "Core") {
          coreItems.push(doc.data());
        }
      });
      setBackResults(backItems);
      setLegsResults(legsItems);
      setChestResults(chestItems);
      setArmsResults(armsItems);
      setGlutesResults(glutesItems);
      setMultipurposeResults(multipurposeItems);
      setShouldersResults(shouldersItems);
      setCoreResults(coreItems);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <div>
      <div className="location-header">
        <h1>
          {sessionStorage.getItem("locresult")}
        </h1>
      </div>
        <ResultBoxTest title="Back" results={backResults} />
        <ResultBoxTest title="Chest" results={chestResults} />
        <ResultBoxTest title="Legs" results={legsResults} />
        <ResultBoxTest title="Arms" results={armsResults} />
        <ResultBoxTest title="Glutes" results={glutesResults} />
        <ResultBoxTest title="Multipurpose" results={multipurposeResults} />
        <ResultBoxTest title="Shoulders" results={shouldersResults} />
        <ResultBoxTest title="Core" results={coreResults} />
    </div>
  );
};

export default SearchLocResults;