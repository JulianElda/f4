import { ElementalStates } from "consts/jobactions";

export type DetailedAction = {
  name: string;
  filler: boolean;
  currentElement: ElementalStates;
  potency: number;
  adjustedPotency: number;
  potencyMultiplier: number;
  cast: number;
  adjustedCast: number;
  castMultiplier: number;
  recast: number;
  note: string;
};

type DetailsProps = {
  detailedActions: DetailedAction[];
};

export default function Details(props: DetailsProps) {
  const getDetailsContent = function (): React.ReactNode {
    const content: React.ReactNode[] = [];
    props.detailedActions.forEach(function (detailedAction: DetailedAction) {
      content.push(
        <Detail
          key={Math.random() * 100}
          {...detailedAction}
        />
      );
    });
    return content;
  };

  return <div className="space-y-2">{getDetailsContent()}</div>;
}

function Detail(props: DetailedAction) {
  const POTENCY_HEADING = "Potency:";
  const CAST_HEADING = "Time:";
  const CASTER_TAX_TEXT = "0.1 caster tax";

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

  const getTime = function (): React.ReactNode {
    function roundCast(cast: number): string {
      return (cast / 1000).toFixed(2);
    }
    if (props.adjustedCast > props.recast) {
      return (
        <div>
          <span>
            {CAST_HEADING} {roundCast(props.cast)} base + {CASTER_TAX_TEXT} ={" "}
            {roundCast(props.adjustedCast)}
          </span>
        </div>
      );
    } else {
      return (
        <div>
          <span>
            {CAST_HEADING} {roundCast(props.recast)}
          </span>
        </div>
      );
    }
  };

  const getDetail = function () {
    if (props.filler) return <></>;
    else
      return (
        <div className="px-2 text-sm">
          <div>
            <span className="font-semibold">{props.name}</span>
          </div>
          {getPotency()}
          {getTime()}
        </div>
      );
  };

  return <>{getDetail()}</>;
}
