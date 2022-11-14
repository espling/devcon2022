import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "gsap";
import { useEffect } from "react";

export default function Logo() {
  //   gsap.registerPlugin(DrawSVGPlugin, CustomEase);

  useEffect(() => {
    gsap.set(".line", { transformOrigin: "center center" });
    const timeline = gsap
      .timeline({ repeatRefresh: true })
      .from(".line", {
        scale: 0,
        rotate: -480,
      })
      .fromTo("#straight-yellow", { drawSVG: "0% 0%" }, { drawSVG: "0% 100%" })
      .fromTo(
        "#straight-grey",
        { drawSVG: "100% 100%" },
        { drawSVG: "0% 100%" }
      );
    window.addEventListener("click", () => {
      timeline.restart();
    });
  }, []);

  return (
    <svg viewBox="0 0 680 178" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_46_314)">
        <path d="M552.09 161.856H530.142V163.123H552.09V161.856Z" fill="red" />
        <path
          d="M552.09 175.467H530.142V176.734H552.09V175.467Z"
          fill="white"
        />
        <path
          d="M531.407 176.737V161.86H530.142V176.737H531.407Z"
          fill="white"
        />
        <path
          d="M552.09 176.733V161.856H550.825V176.733H552.09Z"
          fill="white"
        />
        <path
          d="M467.071 163.126H489.019V161.86H467.071V163.126Z"
          fill="white"
        />
        <path
          d="M467.071 169.928H489.019V168.661H467.071V169.928Z"
          fill="white"
        />
        <path
          d="M467.071 176.733H489.019V175.467H467.071V176.733Z"
          fill="white"
        />
        <path
          d="M489.015 169.932V161.86H487.75V169.932H489.015Z"
          fill="white"
        />
        <path
          d="M468.331 176.718V168.646H467.067V176.718H468.331Z"
          fill="white"
        />
        <path
          d="M593.217 163.126H615.165V161.86H593.217V163.126Z"
          fill="white"
        />
        <path
          d="M593.217 169.928H615.165V168.661H593.217V169.928Z"
          fill="white"
        />
        <path
          d="M593.217 176.733H615.165V175.467H593.217V176.733Z"
          fill="white"
        />
        <path
          d="M615.165 169.928V161.856H613.9V169.928H615.165Z"
          fill="white"
        />
        <path
          d="M594.482 176.722V168.65H593.217V176.722H594.482Z"
          fill="white"
        />
        <path
          d="M656.292 163.126H678.24V161.86H656.292V163.126Z"
          fill="white"
        />
        <path
          d="M656.292 169.928H678.24V168.661H656.292V169.928Z"
          fill="white"
        />
        <path
          d="M656.292 176.733H678.24V175.467H656.292V176.733Z"
          fill="white"
        />
        <path
          d="M678.24 169.928V161.856H676.976V169.928H678.24Z"
          fill="white"
        />
        <path
          d="M657.557 176.722V168.65H656.292V176.722H657.557Z"
          fill="white"
        />
        <path
          d="M552.09 163.126H530.142V164.393H552.09V163.126Z"
          fill="white"
        />
        <path d="M552.09 176.733H530.142V178H552.09V176.733Z" fill="white" />
        <path
          d="M531.411 178.004V163.126H530.146V178.004H531.411Z"
          fill="white"
        />
        <path d="M552.09 178V163.123H550.825V178H552.09Z" fill="white" />
        <path
          d="M467.071 164.389H489.019V163.123H467.071V164.389Z"
          fill="white"
        />
        <path
          d="M467.071 171.198H489.019V169.932H467.071V171.198Z"
          fill="white"
        />
        <path d="M467.071 178H489.019V176.733H467.071V178Z" fill="white" />
        <path
          d="M489.015 171.199V163.126H487.75V171.199H489.015Z"
          fill="white"
        />
        <path
          d="M468.335 177.989V169.917H467.071V177.989H468.335Z"
          fill="white"
        />
        <path
          d="M593.217 164.389H615.165V163.123H593.217V164.389Z"
          fill="white"
        />
        <path
          d="M593.217 171.198H615.165V169.932H593.217V171.198Z"
          fill="white"
        />
        <path d="M593.217 178H615.165V176.733H593.217V178Z" fill="white" />
        <path
          d="M615.165 171.195V163.123H613.9V171.195H615.165Z"
          fill="white"
        />
        <path
          d="M594.482 177.989V169.917H593.217V177.989H594.482Z"
          fill="white"
        />
        <path
          d="M656.292 164.389H678.24V163.123H656.292V164.389Z"
          fill="white"
        />
        <path
          d="M656.292 171.198H678.24V169.932H656.292V171.198Z"
          fill="white"
        />
        <path d="M656.292 178H678.24V176.733H656.292V178Z" fill="white" />
        <path
          d="M678.24 171.195V163.123H676.976V171.195H678.24Z"
          fill="white"
        />
        <path
          d="M657.557 177.989V169.917H656.292V177.989H657.557Z"
          fill="white"
        />
        <path
          d="M550.821 161.844H528.873V163.111H550.821V161.844Z"
          fill="white"
        />
        <path
          d="M550.821 175.455H528.873V176.722H550.821V175.455Z"
          fill="white"
        />
        <path
          d="M530.142 176.726V161.848H528.877V176.726H530.142Z"
          fill="white"
        />
        <path
          d="M550.825 176.722V161.844H549.561V176.722H550.825Z"
          fill="white"
        />
        <path
          d="M465.798 163.115H487.746V161.848H465.798V163.115Z"
          fill="white"
        />
        <path
          d="M465.798 169.92H487.746V168.654H465.798V169.92Z"
          fill="white"
        />
        <path
          d="M465.798 176.722H487.746V175.455H465.798V176.722Z"
          fill="white"
        />
        <path
          d="M487.746 169.92V161.848H486.482V169.92H487.746Z"
          fill="white"
        />
        <path
          d="M467.067 176.706V168.634H465.802V176.706H467.067Z"
          fill="white"
        />
        <path
          d="M591.952 163.115H613.901V161.848H591.952V163.115Z"
          fill="white"
        />
        <path
          d="M591.952 169.92H613.901V168.654H591.952V169.92Z"
          fill="white"
        />
        <path
          d="M591.952 176.722H613.901V175.455H591.952V176.722Z"
          fill="white"
        />
        <path
          d="M613.897 169.92V161.848H612.632V169.92H613.897Z"
          fill="white"
        />
        <path
          d="M593.217 176.71V168.638H591.952V176.71H593.217Z"
          fill="white"
        />
        <path
          d="M655.024 163.115H676.972V161.848H655.024V163.115Z"
          fill="white"
        />
        <path
          d="M655.024 169.92H676.972V168.654H655.024V169.92Z"
          fill="white"
        />
        <path
          d="M655.024 176.722H676.972V175.455H655.024V176.722Z"
          fill="white"
        />
        <path
          d="M676.972 169.916V161.844H675.707V169.916H676.972Z"
          fill="white"
        />
        <path
          d="M656.288 176.71V168.638H655.024V176.71H656.288Z"
          fill="white"
        />
        <path
          d="M550.821 163.115H528.873V164.381H550.821V163.115Z"
          fill="white"
        />
        <path
          d="M550.821 176.722H528.873V177.988H550.821V176.722Z"
          fill="white"
        />
        <path
          d="M530.142 177.992V163.115H528.877V177.992H530.142Z"
          fill="white"
        />
        <path
          d="M550.825 177.988V163.111H549.561V177.988H550.825Z"
          fill="white"
        />
        <path
          d="M465.798 164.381H487.746V163.115H465.798V164.381Z"
          fill="white"
        />
        <path
          d="M465.798 171.187H487.746V169.92H465.798V171.187Z"
          fill="white"
        />
        <path
          d="M465.798 177.992H487.746V176.726H465.798V177.992Z"
          fill="white"
        />
        <path
          d="M487.75 171.187V163.115H486.486V171.187H487.75Z"
          fill="white"
        />
        <path
          d="M467.067 177.977V169.905H465.802V177.977H467.067Z"
          fill="white"
        />
        <path
          d="M591.952 164.381H613.901V163.115H591.952V164.381Z"
          fill="white"
        />
        <path
          d="M591.952 171.187H613.901V169.92H591.952V171.187Z"
          fill="white"
        />
        <path
          d="M591.952 177.992H613.901V176.726H591.952V177.992Z"
          fill="white"
        />
        <path
          d="M613.897 171.187V163.115H612.632V171.187H613.897Z"
          fill="white"
        />
        <path
          d="M593.217 177.977V169.905H591.952V177.977H593.217Z"
          fill="white"
        />
        <path
          d="M655.024 164.381H676.972V163.115H655.024V164.381Z"
          fill="white"
        />
        <path
          d="M655.024 171.187H676.972V169.92H655.024V171.187Z"
          fill="white"
        />
        <path
          d="M655.024 177.992H676.972V176.726H655.024V177.992Z"
          fill="white"
        />
        <path
          d="M676.972 171.183V163.111H675.707V171.183H676.972Z"
          fill="white"
        />
        <path
          d="M656.292 177.977V169.905H655.028V177.977H656.292Z"
          fill="white"
        />
        <path
          d="M217.311 49.7842H168.921V52.5807H217.311V49.7842Z"
          fill="white"
        />
        <path
          d="M217.311 79.7871H168.921V82.5837H217.311V79.7871Z"
          fill="white"
        />
        <path
          d="M217.311 64.7856H168.921V67.5822H217.311V64.7856Z"
          fill="white"
        />
        <path
          d="M171.713 82.5837V49.7842H168.921V82.5837H171.713Z"
          fill="white"
        />
        <path
          d="M586.785 66.1918L584.801 67.5823L582.817 66.1918L563.391 52.5731V49.7959L584.801 64.8013L586.785 66.1918Z"
          fill="white"
        />
        <path
          d="M582.817 66.1879L584.801 64.7974L586.785 66.1879L606.208 79.8027V82.5838L584.801 67.5784L582.817 66.1879Z"
          fill="white"
        />
        <path
          d="M563.395 82.5876V49.7881H560.602V82.5876H563.395Z"
          fill="white"
        />
        <path
          d="M608.993 82.5877V49.7881H606.2V82.5877H608.993Z"
          fill="white"
        />
        <path
          d="M116.547 52.5731H71.0073V49.7959H113.774L116.547 52.5731Z"
          fill="white"
        />
        <path
          d="M116.547 79.7832L113.751 82.5836H71.0073V79.7832H116.547Z"
          fill="white"
        />
        <path
          d="M73.7958 82.576V49.7842H71.0073V82.576H73.7958Z"
          fill="white"
        />
        <path
          d="M119.386 55.4159V76.9634L116.59 79.7406V52.6155L119.386 55.4159Z"
          fill="white"
        />
        <path
          d="M119.386 55.4161V59.3708L112.598 52.5731L109.825 49.7959H113.774L119.386 55.4161Z"
          fill="white"
        />
        <path
          d="M119.386 72.9856V76.9635L116.59 79.7407L116.547 79.7833L113.751 82.5838H109.825L112.622 79.7833L116.59 75.786L119.386 72.9856Z"
          fill="white"
        />
        <path
          d="M297.612 79.7832L295.713 81.7702L294.944 82.5836H287.131L286.362 81.7702L284.463 79.7832H297.612Z"
          fill="white"
        />
        <path
          d="M269.754 49.7842V59.0647L266.869 49.912L266.827 49.7842H269.754Z"
          fill="white"
        />
        <path
          d="M276.65 71.5949L272.249 66.974L270.35 60.9238L274.728 65.5215L276.65 71.5949Z"
          fill="white"
        />
        <path
          d="M291.037 82.5837H287.131L286.361 81.7703L284.463 79.7833L276.65 71.595L272.249 66.9741L269.754 64.3673L266.869 61.3539V57.9105L267.275 57.7168L269.754 60.3042L270.331 60.9046L270.35 60.9239L274.728 65.5216L288.346 79.7833L289.011 80.465L291.037 82.5837Z"
          fill="white"
        />
        <path
          d="M269.754 49.7842V64.3674L266.869 61.3539V49.7842H269.754Z"
          fill="white"
        />
        <path
          d="M312.32 49.7842V59.0647L315.202 49.912L315.248 49.7842H312.32Z"
          fill="white"
        />
        <path
          d="M305.424 71.5949L309.822 66.974L311.725 60.9238L307.347 65.5215L305.424 71.5949Z"
          fill="white"
        />
        <path
          d="M315.205 57.9105V61.3539L312.32 64.3673L309.822 66.9741L305.424 71.595L297.612 79.7833L295.713 81.7703L294.944 82.5837H291.037L293.064 80.465L293.725 79.7833L307.347 65.5216L311.725 60.9239L311.744 60.9046L312.32 60.3042L314.799 57.7168L315.205 57.9105Z"
          fill="white"
        />
        <path
          d="M312.32 49.7842V64.3674L315.202 61.3539V49.7842H312.32Z"
          fill="white"
        />
        <path
          d="M511.075 49.7842H462.685V52.5807H511.075V49.7842Z"
          fill="white"
        />
        <path
          d="M511.075 79.7871H462.685V82.5837H511.075V79.7871Z"
          fill="white"
        />
        <path
          d="M465.477 82.5877V49.7881H462.685V82.5877H465.477Z"
          fill="white"
        />
        <path
          d="M511.075 82.5837V49.7842H508.283V82.5837H511.075Z"
          fill="white"
        />
        <path
          d="M413.154 49.7842H364.764V52.5807H413.154V49.7842Z"
          fill="white"
        />
        <path
          d="M413.154 79.7871H364.764V82.5837H413.154V79.7871Z"
          fill="white"
        />
        <path
          d="M367.556 82.5837V49.7842H364.764V82.5837H367.556Z"
          fill="white"
        />
        <path
          d="M678.24 1.76245H1.75977V130.606H678.24V1.76245Z"
          stroke="white"
          strokeWidth="1.3"
          strokeMiterlimit="10"
        />
        <path
          d="M1.75977 37.5019V1.76245H37.4452"
          stroke="white"
          strokeWidth="9.1"
          strokeMiterlimit="10"
        />
        <path
          d="M1.75977 94.8662V130.606H37.4452"
          stroke="white"
          strokeWidth="9.1"
          strokeMiterlimit="10"
        />
        <path
          d="M678.24 37.5019V1.76245H642.555"
          stroke="white"
          strokeWidth="9.1"
          strokeMiterlimit="10"
        />
        <path
          d="M678.24 94.8662V130.606H642.555"
          stroke="white"
          strokeWidth="9.1"
          strokeMiterlimit="10"
        />
      </g>
      <defs>
        <clipPath id="clip0_46_314">
          <rect width="680" height="178" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
