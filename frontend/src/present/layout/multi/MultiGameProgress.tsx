import React from "react";
import { useGameInfoStore } from "../../pages/MultiGamePage";
import { MultiGameDomestic } from "./MultiGameDomestic";
import { MultiGameInternational } from "./MultiGameInternational";

type Props = {
  isDomestic: boolean
  isLoaded: string
};
export const MultiGameProgress = ({ isDomestic, isLoaded }: Props) => {
  const { isObserver } = useGameInfoStore();
  return (
    <React.Fragment>
      {isDomestic ? <MultiGameDomestic isObserver={isObserver} /> : <MultiGameInternational isObserver={isObserver} />}
    </React.Fragment>
  );
};