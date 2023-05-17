import React from "react";
import { MultiGameDomestic } from "./MultiGameDomestic";
import { MultiGameInternational } from "./MultiGameInternational";

type Props = {
  isDomestic: boolean
  isLoaded: string
  isObserver: boolean
};
export const MultiGameProgress = ({isDomestic, isLoaded, isObserver }: Props) => {
  return (
    <React.Fragment>
      {isDomestic ? <MultiGameDomestic isObserver={isObserver} /> : <MultiGameInternational isObserver={isObserver} />}
    </React.Fragment>
  );
};