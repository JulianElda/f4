import { ElementalStates } from "consts/jobactions";

export type DetailedAction = {
  name: string;
  currentElement?: ElementalStates;
  potency?: number;
  adjustedPotency?: number;
  potencyMultiplier?: number;
  cast?: number;
  adjustedCast?: number;
  castMultiplier?: number;
  recast?: number;
  adjustedRecast?: number;
  note?: string;
};

type DetailsProps = {
  detailedActions: DetailedAction[];
};

export default function Details(props: DetailsProps) {
  const getDetailsContent = function (): React.ReactNode {
    let content: React.ReactNode[] = [];
    props.detailedActions.forEach(function (detailedAction: DetailedAction) {
      content.push(<Detail key={Math.random() * 100} {...detailedAction} />);
    });
    return content;
  };

  return <div className="space-y-2">{getDetailsContent()}</div>;
}

function Detail(props: DetailedAction) {
  const POTENCY_HEADING: string = "Potency:";
  const CAST_HEADING: string = "Time:";
  const CASTER_TAX_TEXT: string = "0.1 caster tax";

  const getPotency = function (): React.ReactNode {
    if (props.potencyMultiplier === 1) {
      return (
        <div>
          <span>
            {POTENCY_HEADING} {props.potency}
          </span>
        </div>
      );
    } else {
      return (
        <div>
          <span>
            {POTENCY_HEADING} ({props.potency} base * {props.potencyMultiplier}{" "}
            {props.currentElement}) = {props.adjustedPotency}
          </span>
        </div>
      );
    }
  };

  const getCast = function (): React.ReactNode {
    function roundCast(cast: number): string {
      return (cast / 1000).toFixed(2);
    }

    if (props.cast! < props.adjustedCast!) {
      return (
        <div>
          <span>
            {CAST_HEADING} {roundCast(props.cast!)} base + {CASTER_TAX_TEXT} ={" "}
            {roundCast(props.adjustedCast!)}
          </span>
        </div>
      );
    } else {
      return (
        <div>
          <span>
            {CAST_HEADING} {roundCast(props.cast!)}
          </span>
        </div>
      );
    }
  };

  return (
    <div className="text-xs font-mono">
      <div>
        <span className="font-semibold">{props.name}</span>
      </div>
      {props.potency && getPotency()}
      {props.cast && getCast()}
    </div>
  );
}
