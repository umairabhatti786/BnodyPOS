import React from "react";
import Svg, {
  Path,
  G,
  Defs,
  Rect,
  ClipPath,
  LinearGradient,
  Circle,
  Stop,
} from "react-native-svg";

const WhiteForwardarrowIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      onPress={onPress}
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M7.78625 1L1.16317 7.62308C1.11166 7.67142 1.07061 7.72981 1.04254 7.79464C1.01448 7.85947 1 7.92936 1 8C1 8.07064 1.01448 8.14054 1.04254 8.20536C1.07061 8.27019 1.11166 8.32858 1.16317 8.37692L7.78625 15"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const WhitedownarrowIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      onPress={onPress}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M3.33337 6L7.74876 10.4154C7.78099 10.4497 7.81991 10.4771 7.86313 10.4958C7.90635 10.5145 7.95295 10.5242 8.00004 10.5242C8.04714 10.5242 8.09373 10.5145 8.13695 10.4958C8.18017 10.4771 8.21909 10.4497 8.25132 10.4154L12.6667 6"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const ForwardIcon = ({ style }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M1 1.33301L5.41538 5.74839C5.44972 5.78062 5.47709 5.81955 5.4958 5.86277C5.51451 5.90598 5.52417 5.95258 5.52417 5.99967C5.52417 6.04677 5.51451 6.09337 5.4958 6.13658C5.47709 6.1798 5.44972 6.21873 5.41538 6.25096L1 10.6663"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const BackIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      onPress={onPress}
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M7.78625 1L1.16317 7.62308C1.11166 7.67142 1.07061 7.72981 1.04254 7.79464C1.01448 7.85947 1 7.92936 1 8C1 8.07064 1.01448 8.14054 1.04254 8.20536C1.07061 8.27019 1.11166 8.32858 1.16317 8.37692L7.78625 15"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const PenIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      onPress={onPress}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M0.999939 19H16.2239"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M9.30409 14.156L5.1521 14.9034L5.8441 10.696L15.1584 1.40938C15.2871 1.27966 15.4401 1.1767 15.6088 1.10644C15.7774 1.03618 15.9583 1 16.141 1C16.3237 1 16.5046 1.03618 16.6733 1.10644C16.842 1.1767 16.995 1.27966 17.1237 1.40938L18.5907 2.87642C18.7204 3.00508 18.8234 3.15815 18.8937 3.32681C18.9639 3.49546 19.0001 3.67636 19.0001 3.85906C19.0001 4.04177 18.9639 4.22266 18.8937 4.39131C18.8234 4.55997 18.7204 4.71304 18.5907 4.8417L9.30409 14.156Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const ErrorIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      onPress={onPress}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M7.9993 5.33317C7.9073 5.33317 7.83263 5.40784 7.8333 5.49984C7.8333 5.59184 7.90796 5.6665 7.99996 5.6665C8.09196 5.6665 8.16663 5.59184 8.16663 5.49984C8.16663 5.40784 8.09196 5.33317 7.9993 5.33317"
        stroke="#798293"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 14V14C4.686 14 2 11.314 2 8V8C2 4.686 4.686 2 8 2V2C11.314 2 14 4.686 14 8V8C14 11.314 11.314 14 8 14Z"
        stroke="#798293"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.99996 8V11.3333"
        stroke="#798293"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const CityIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M1.69214 13.4618H4.11522C4.75786 13.4618 5.37417 13.2065 5.82859 12.7521C6.283 12.2977 6.53829 11.6813 6.53829 11.0387V8.96178C6.53829 8.31914 6.79358 7.70282 7.248 7.24841C7.70241 6.79399 8.31873 6.53871 8.96137 6.53871C9.60401 6.53871 10.2203 6.28342 10.6747 5.829C11.1292 5.37459 11.3844 4.75827 11.3844 4.11563V1.09717"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.9998 9.86146C18.3065 9.50175 17.5377 9.31192 16.7567 9.30762H13.8075C13.1648 9.30762 12.5485 9.56291 12.0941 10.0173C11.6397 10.4717 11.3844 11.0881 11.3844 11.7307C11.3844 12.3733 11.6397 12.9897 12.0941 13.4441C12.5485 13.8985 13.1648 14.1538 13.8075 14.1538C14.2665 14.1538 14.7067 14.3361 15.0313 14.6607C15.3559 14.9853 15.5382 15.4255 15.5382 15.8845V17.0892"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const StateIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M12.0769 19L19 1L1 7.92308L9.30769 10.6923L12.0769 19Z"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const ZipIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M10 12.8079H2.38462C2.01739 12.8079 1.66521 12.662 1.40554 12.4023C1.14588 12.1427 1 11.7905 1 11.4233V3.11557C1 2.74835 1.14588 2.39617 1.40554 2.1365C1.66521 1.87684 2.01739 1.73096 2.38462 1.73096H17.6154C17.9826 1.73096 18.3348 1.87684 18.5945 2.1365C18.8541 2.39617 19 2.74835 19 3.11557V3.80788"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M5.15405 5.88477V8.654"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.9999 9.80337C18.9999 11.5895 15.8845 16.2695 15.8845 16.2695C15.8845 16.2695 12.7692 11.5895 12.7692 9.80337C12.7692 8.97712 13.0974 8.18471 13.6816 7.60046C14.2659 7.01622 15.0583 6.68799 15.8845 6.68799C16.7108 6.68799 17.5032 7.01622 18.0875 7.60046C18.6717 8.18471 18.9999 8.97712 18.9999 9.80337V9.80337Z"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M15.8846 10.0385C16.0758 10.0385 16.2308 9.88352 16.2308 9.69235C16.2308 9.50117 16.0758 9.34619 15.8846 9.34619C15.6934 9.34619 15.5385 9.50117 15.5385 9.69235C15.5385 9.88352 15.6934 10.0385 15.8846 10.0385Z"
        stroke="#08101F"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const CategoryIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M7.23077 1H1.69231C1.30996 1 1 1.30996 1 1.69231V7.23077C1 7.61312 1.30996 7.92308 1.69231 7.92308H7.23077C7.61312 7.92308 7.92308 7.61312 7.92308 7.23077V1.69231C7.92308 1.30996 7.61312 1 7.23077 1Z"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.3078 1H12.7693C12.387 1 12.077 1.30996 12.077 1.69231V7.23077C12.077 7.61312 12.387 7.92308 12.7693 7.92308H18.3078C18.6901 7.92308 19.0001 7.61312 19.0001 7.23077V1.69231C19.0001 1.30996 18.6901 1 18.3078 1Z"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.23077 12.0771H1.69231C1.30996 12.0771 1 12.3871 1 12.7695V18.3079C1 18.6903 1.30996 19.0002 1.69231 19.0002H7.23077C7.61312 19.0002 7.92308 18.6903 7.92308 18.3079V12.7695C7.92308 12.3871 7.61312 12.0771 7.23077 12.0771Z"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.3078 12.0771H12.7693C12.387 12.0771 12.077 12.3871 12.077 12.7695V18.3079C12.077 18.6903 12.387 19.0002 12.7693 19.0002H18.3078C18.6901 19.0002 19.0001 18.6903 19.0001 18.3079V12.7695C19.0001 12.3871 18.6901 12.0771 18.3078 12.0771Z"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const PriceIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M10.0001 6.53884V4.46191"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.9231 12.0765C7.9231 13.115 8.85079 13.4612 10 13.4612C11.1492 13.4612 12.0769 13.4612 12.0769 12.0765C12.0769 9.99962 7.9231 9.99962 7.9231 7.9227C7.9231 6.53809 8.85079 6.53809 10 6.53809C11.1492 6.53809 12.0769 7.06424 12.0769 7.9227"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M9.99988 13.4609V15.5379"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const DurationIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M8.65393 3.76953C10.6737 3.76953 12.6107 4.57186 14.0388 6.00003C15.467 7.42819 16.2693 9.36519 16.2693 11.3849C16.2693 13.4046 15.467 15.3416 14.0388 16.7698C12.6107 18.198 10.6737 19.0003 8.65393 19.0003V3.76953Z"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6.57678 1H10.7306"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8.65393 1V3.76923"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M15.5769 3.07715L16.9615 4.46176"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M3.26746 5.99805L4.73515 7.46574"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M1.03845 11.3848H3.11538"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M3.26746 16.7704L4.73515 15.3027"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const AmenitiesIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M1.69231 2.46176C2.07466 2.46176 2.38462 2.15181 2.38462 1.76946C2.38462 1.38711 2.07466 1.07715 1.69231 1.07715C1.30996 1.07715 1 1.38711 1 1.76946C1 2.15181 1.30996 2.46176 1.69231 2.46176Z"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6.53845 1.76953H19"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M1.69231 8.69272C2.07466 8.69272 2.38462 8.38276 2.38462 8.00041C2.38462 7.61806 2.07466 7.30811 1.69231 7.30811C1.30996 7.30811 1 7.61806 1 8.00041C1 8.38276 1.30996 8.69272 1.69231 8.69272Z"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6.53845 8H19"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M1.69231 14.9232C2.07466 14.9232 2.38462 14.6132 2.38462 14.2309C2.38462 13.8485 2.07466 13.5386 1.69231 13.5386C1.30996 13.5386 1 13.8485 1 14.2309C1 14.6132 1.30996 14.9232 1.69231 14.9232Z"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6.53845 14.231H19"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const CitySimpleIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M1.69214 13.4613H4.11522C4.75786 13.4613 5.37417 13.206 5.82859 12.7516C6.283 12.2972 6.53829 11.6809 6.53829 11.0382V8.96129C6.53829 8.31865 6.79358 7.70234 7.248 7.24792C7.70241 6.79351 8.31873 6.53822 8.96137 6.53822C9.60401 6.53822 10.2203 6.28293 10.6747 5.82852C11.1292 5.3741 11.3844 4.75778 11.3844 4.11514V1.09668"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.9998 9.86146C18.3066 9.50175 17.5378 9.31192 16.7568 9.30762H13.8075C13.1649 9.30762 12.5486 9.56291 12.0942 10.0173C11.6397 10.4717 11.3845 11.0881 11.3845 11.7307C11.3845 12.3733 11.6397 12.9897 12.0942 13.4441C12.5486 13.8985 13.1649 14.1538 13.8075 14.1538C14.2666 14.1538 14.7068 14.3361 15.0314 14.6607C15.356 14.9853 15.5383 15.4255 15.5383 15.8845V17.0892"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const StateSimpleIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M12.0769 19L19 1L1 7.92308L9.30769 10.6923L12.0769 19Z"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const ZipSimpleIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M10 12.8074H2.38462C2.01739 12.8074 1.66521 12.6615 1.40554 12.4018C1.14588 12.1422 1 11.79 1 11.4228V3.11508C1 2.74786 1.14588 2.39568 1.40554 2.13601C1.66521 1.87635 2.01739 1.73047 2.38462 1.73047H17.6154C17.9826 1.73047 18.3348 1.87635 18.5945 2.13601C18.8541 2.39568 19 2.74786 19 3.11508V3.80739"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M5.15402 5.88477V8.654"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.9999 9.80288C18.9999 11.589 15.8845 16.269 15.8845 16.269C15.8845 16.269 12.7691 11.589 12.7691 9.80288C12.7691 8.97663 13.0973 8.18422 13.6816 7.59998C14.2658 7.01573 15.0582 6.6875 15.8845 6.6875C16.7107 6.6875 17.5032 7.01573 18.0874 7.59998C18.6716 8.18422 18.9999 8.97663 18.9999 9.80288V9.80288Z"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M15.8846 10.038C16.0758 10.038 16.2308 9.88303 16.2308 9.69186C16.2308 9.50068 16.0758 9.3457 15.8846 9.3457C15.6934 9.3457 15.5385 9.50068 15.5385 9.69186C15.5385 9.88303 15.6934 10.038 15.8846 10.038Z"
        stroke="#798293"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const CategorySimpleIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M7.23077 1H1.69231C1.30996 1 1 1.30996 1 1.69231V7.23077C1 7.61312 1.30996 7.92308 1.69231 7.92308H7.23077C7.61312 7.92308 7.92308 7.61312 7.92308 7.23077V1.69231C7.92308 1.30996 7.61312 1 7.23077 1Z"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.3077 1H12.7693C12.3869 1 12.077 1.30996 12.077 1.69231V7.23077C12.077 7.61312 12.3869 7.92308 12.7693 7.92308H18.3077C18.6901 7.92308 19 7.61312 19 7.23077V1.69231C19 1.30996 18.6901 1 18.3077 1Z"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.23077 12.0771H1.69231C1.30996 12.0771 1 12.3871 1 12.7695V18.3079C1 18.6903 1.30996 19.0002 1.69231 19.0002H7.23077C7.61312 19.0002 7.92308 18.6903 7.92308 18.3079V12.7695C7.92308 12.3871 7.61312 12.0771 7.23077 12.0771Z"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.3077 12.0771H12.7693C12.3869 12.0771 12.077 12.3871 12.077 12.7695V18.3079C12.077 18.6903 12.3869 19.0002 12.7693 19.0002H18.3077C18.6901 19.0002 19 18.6903 19 18.3079V12.7695C19 12.3871 18.6901 12.0771 18.3077 12.0771Z"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const AmenitiesSimpleIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M1.69231 2.46176C2.07466 2.46176 2.38462 2.15181 2.38462 1.76946C2.38462 1.38711 2.07466 1.07715 1.69231 1.07715C1.30996 1.07715 1 1.38711 1 1.76946C1 2.15181 1.30996 2.46176 1.69231 2.46176Z"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6.53848 1.76953H19"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M1.69231 8.69223C2.07466 8.69223 2.38462 8.38228 2.38462 7.99992C2.38462 7.61757 2.07466 7.30762 1.69231 7.30762C1.30996 7.30762 1 7.61757 1 7.99992C1 8.38228 1.30996 8.69223 1.69231 8.69223Z"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6.53848 8H19"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M1.69231 14.9237C2.07466 14.9237 2.38462 14.6137 2.38462 14.2314C2.38462 13.849 2.07466 13.5391 1.69231 13.5391C1.30996 13.5391 1 13.849 1 14.2314C1 14.6137 1.30996 14.9237 1.69231 14.9237Z"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6.53848 14.2314H19"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const PriceSimpleIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M10.0002 6.53884V4.46191"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.92307 12.0765C7.92307 13.115 8.85076 13.4612 9.99999 13.4612C11.1492 13.4612 12.0769 13.4612 12.0769 12.0765C12.0769 9.99962 7.92307 9.99962 7.92307 7.9227C7.92307 6.53809 8.85076 6.53809 9.99999 6.53809C11.1492 6.53809 12.0769 7.06424 12.0769 7.9227"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M9.99988 13.4609V15.5379"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const DurationSimpleIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M8.65396 3.76953C10.6737 3.76953 12.6107 4.57186 14.0389 6.00003C15.467 7.42819 16.2693 9.36519 16.2693 11.3849C16.2693 13.4046 15.467 15.3416 14.0389 16.7698C12.6107 18.198 10.6737 19.0003 8.65396 19.0003V3.76953Z"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6.57675 1H10.7306"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8.65396 1V3.76923"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M15.5769 3.07715L16.9615 4.46176"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M3.26749 5.99805L4.73518 7.46574"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M1.03845 11.3848H3.11538"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M3.26749 16.7704L4.73518 15.3027"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const LocationIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 10 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M-nan -nanL9.15385 5.15385C9.15385 6.65465 7.38283 9.54079 6.1536 11.3632C5.59386 12.1931 4.40615 12.1931 3.84641 11.3632C2.61718 9.54078 0.846161 6.65465 0.846161 5.15385C0.846161 4.05218 1.2838 2.99563 2.06279 2.21663C2.84179 1.43764 3.89834 1 5.00001 1C6.10168 1 7.15822 1.43764 7.93722 2.21663C8.71622 2.99563 9.15385 4.05218 9.15385 5.15385L-nan -nanL-nan -nanZ"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M5.00012 6.53827C5.76483 6.53827 6.38474 5.91836 6.38474 5.15366C6.38474 4.38896 5.76483 3.76904 5.00012 3.76904C4.23542 3.76904 3.61551 4.38896 3.61551 5.15366C3.61551 5.91836 4.23542 6.53827 5.00012 6.53827Z"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const RatingIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M7.46589 1.53576L8.93705 4.50584C8.97051 4.58122 9.02314 4.64652 9.0897 4.69522C9.15626 4.74393 9.23443 4.77433 9.3164 4.78341L12.5641 5.26455C12.6581 5.27663 12.7467 5.31522 12.8197 5.37581C12.8926 5.4364 12.9468 5.51649 12.9759 5.60672C13.005 5.69695 13.0078 5.7936 12.984 5.88538C12.9603 5.97716 12.9109 6.06028 12.8416 6.12504L10.5007 8.44743C10.441 8.50325 10.3961 8.57312 10.3703 8.65069C10.3444 8.72825 10.3384 8.81105 10.3527 8.89156L10.9171 12.1577C10.9334 12.2516 10.9231 12.3481 10.8873 12.4364C10.8515 12.5247 10.7916 12.6011 10.7145 12.657C10.6373 12.7129 10.5461 12.7461 10.451 12.7527C10.356 12.7593 10.261 12.7391 10.1769 12.6944L7.25308 11.1492C7.17821 11.1124 7.09591 11.0933 7.01251 11.0933C6.92911 11.0933 6.84681 11.1124 6.77194 11.1492L3.84813 12.6944C3.76401 12.7391 3.66903 12.7593 3.574 12.7527C3.47897 12.7461 3.38769 12.7129 3.31057 12.657C3.23344 12.6011 3.17356 12.5247 3.13774 12.4364C3.10191 12.3481 3.09158 12.2516 3.10792 12.1577L3.67233 8.85455C3.68664 8.77404 3.68058 8.69124 3.65473 8.61368C3.62887 8.53611 3.58403 8.46624 3.52429 8.41042L1.15563 6.12504C1.08555 6.05851 1.03627 5.97308 1.01375 5.87912C0.991238 5.78515 0.996452 5.68667 1.02877 5.5956C1.06108 5.50454 1.1191 5.4248 1.19581 5.36604C1.27252 5.30728 1.36463 5.27203 1.46097 5.26455L4.70862 4.78341C4.7906 4.77433 4.86876 4.74393 4.93532 4.69522C5.00188 4.64652 5.05452 4.58122 5.08798 4.50584L6.55913 1.53576C6.5992 1.44925 6.66317 1.37602 6.74351 1.32469C6.82384 1.27337 6.91718 1.24609 7.01251 1.24609C7.10784 1.24609 7.20118 1.27337 7.28152 1.32469C7.36185 1.37602 7.42582 1.44925 7.46589 1.53576V1.53576Z"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const BasketballIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clip-path="url(#clip0_916_17105)">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.12961 13.8329C4.28989 13.9393 4.4967 13.9441 4.66189 13.8455C6.81246 12.5621 8.90181 10.4382 10.4821 7.70113C11.3879 6.13211 12.0359 4.51927 12.4307 2.95653C12.4795 2.76244 12.408 2.55778 12.2489 2.43644C12.0133 2.25688 11.7635 2.09011 11.5 1.93799C8.15412 0.00623827 3.86959 1.15428 1.93784 4.50017C0.0793351 7.71918 1.07193 11.8075 4.12961 13.8329ZM11.3745 3.03896C11.2536 2.95678 11.1286 2.87826 11 2.80401C8.13217 1.14826 4.45961 2.13232 2.80386 5.00017C1.26449 7.66644 2.00688 11.0286 4.42338 12.8181C6.34809 11.5974 8.19704 9.65891 9.61604 7.20113C10.4102 5.82566 10.9957 4.41494 11.3745 3.03896Z"
          fill="#4AB5E3"
        />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.9702 7.39822C14.0315 8.00638 14.0003 8.63423 13.8647 9.26382C13.1675 12.5012 9.97342 14.5634 6.73602 13.8662C3.49861 13.1691 1.43644 9.97494 2.13361 6.73754C2.83078 3.50013 6.0249 1.43795 9.2623 2.13512C11.1389 2.53923 12.6206 3.78254 13.3988 5.38684C13.5193 5.63513 13.8187 5.73898 14.067 5.61851C14.3153 5.49804 14.4191 5.19859 14.2987 4.9503C13.3907 3.07897 11.662 1.62902 9.47282 1.15758C5.69606 0.344259 1.96938 2.75026 1.15606 6.52702C0.342737 10.3038 2.74875 14.0305 6.52551 14.8438C10.3023 15.6571 14.0289 13.2511 14.8423 9.47433C15.0005 8.73977 15.0367 8.00714 14.965 7.29755C14.9372 7.02294 14.6918 6.82249 14.4172 6.85032C14.1428 6.87821 13.9424 7.12361 13.9702 7.39822Z"
          fill="#4AB5E3"
        />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.26653 1.4983C6.13213 1.36008 5.9302 1.31134 5.7475 1.37329C4.19563 1.9002 2.82083 2.97043 1.93783 4.49983C1.05883 6.0223 0.817557 7.73919 1.13072 9.34027C1.16904 9.53589 1.31974 9.68987 1.51441 9.73269C3.96852 10.2706 6.44404 9.18284 7.4076 7.02041C8.23716 5.15907 7.72731 3.00015 6.26653 1.4983ZM5.76532 2.43291C4.56034 2.91501 3.50248 3.78977 2.80385 4.99983C2.11098 6.19992 1.88041 7.54078 2.057 8.81591C3.92446 9.09388 5.76118 8.25858 6.49433 6.61322C7.11629 5.21745 6.77165 3.6184 5.76532 2.43291Z"
          fill="#4AB5E3"
        />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.36518 4.56096C2.1326 4.4873 1.8809 4.59226 1.76942 4.80936C0.0786401 8.10587 1.25653 12.1897 4.50002 14.0623C7.8459 15.9941 12.1304 14.846 14.0622 11.5001C14.0962 11.4413 14.1292 11.3821 14.1615 11.3222C14.2784 11.1056 14.2201 10.8361 14.0242 10.6869C12.7386 9.70825 11.322 8.76337 9.79905 7.88412C7.27286 6.42562 4.73676 5.31127 2.36518 4.56096ZM2.47941 5.64911C1.30407 8.40085 2.34456 11.6632 5.00002 13.1963C7.79425 14.8095 11.3522 13.9169 13.0645 11.2171C11.9067 10.3576 10.6455 9.52752 9.29905 8.75014C6.98698 7.41527 4.66714 6.37584 2.47941 5.64911Z"
          fill="#4AB5E3"
        />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.9991 7.88352C14.9964 7.73966 14.932 7.60374 14.822 7.51078C14.7121 7.4176 14.5675 7.37656 14.425 7.39791C13.0995 7.59623 11.9735 8.24256 11.2939 9.29561C10.4913 10.5397 10.4632 12.1205 11.1029 13.6315C11.1605 13.7681 11.2758 13.8719 11.4175 13.915C11.5594 13.9583 11.7129 13.9364 11.8369 13.8552C12.7258 13.274 13.4953 12.4817 14.0622 11.4998C14.7202 10.3601 15.0208 9.11139 14.9991 7.88352ZM13.9781 8.51801C13.2076 8.7455 12.5561 9.18398 12.1343 9.83797C11.6112 10.6485 11.5345 11.6423 11.8113 12.6349C12.3532 12.1903 12.8253 11.6422 13.1962 10.9998C13.65 10.2137 13.9056 9.36702 13.9781 8.51801Z"
          fill="#4AB5E3"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_916_17105">
          <Rect width="16" height="16" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
const RulesIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width="44" height="44" rx="22" fill="#F2F3F5" />
      <Path
        d="M17.8462 17.1538V13"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M22.0002 17.1538V13"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M26.1538 17.1538V13"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M29.6154 15.0771H14.3846C13.6199 15.0771 13 15.6971 13 16.4618V29.6156C13 30.3803 13.6199 31.0002 14.3846 31.0002H29.6154C30.3801 31.0002 31 30.3803 31 29.6156V16.4618C31 15.6971 30.3801 15.0771 29.6154 15.0771Z"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M17.154 22H26.8463"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M17.154 26.1538H22.6925"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const Grayforwardicon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      onPress={onPress}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M6 3.3335L10.4154 7.74888C10.4497 7.78111 10.4771 7.82004 10.4958 7.86325C10.5145 7.90647 10.5242 7.95307 10.5242 8.00016C10.5242 8.04726 10.5145 8.09385 10.4958 8.13707C10.4771 8.18029 10.4497 8.21922 10.4154 8.25145L6 12.6668"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const MassageIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M10.5046 18.0092C14.6493 18.0092 18.0092 14.6493 18.0092 10.5046C18.0092 6.35993 14.6493 3 10.5046 3C6.35993 3 3 6.35993 3 10.5046C3 14.6493 6.35993 18.0092 10.5046 18.0092Z"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M20.9999 20.9999L15.8076 15.8076"
        stroke="#798293"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const MassageSendIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width="32" height="32" rx="16" fill="#EDF8FD" />
      <Path
        d="M14.6296 20.6159L17.1427 23.1175C17.2969 23.2755 17.4897 23.3906 17.702 23.4512C17.9143 23.5119 18.1387 23.516 18.3531 23.4633C18.5689 23.4132 18.7681 23.3083 18.9316 23.159C19.0951 23.0096 19.2175 22.8206 19.2869 22.6103L23.4139 10.2409C23.5 10.0091 23.5178 9.75749 23.4651 9.51592C23.4124 9.27435 23.2914 9.05299 23.1166 8.87816C22.9417 8.70333 22.7204 8.58237 22.4788 8.52967C22.2372 8.47697 21.9856 8.49474 21.7538 8.58087L9.38447 12.7078C9.16688 12.7822 8.97309 12.9132 8.82312 13.0875C8.67315 13.2618 8.57244 13.473 8.53141 13.6992C8.48906 13.905 8.49849 14.1181 8.55885 14.3193C8.61921 14.5205 8.72862 14.7035 8.87725 14.852L12.0359 18.0106L11.9321 22.0108L14.6296 20.6159Z"
        stroke="#4AB5E3"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M23.045 8.83447L12.0359 18.0106"
        stroke="#4AB5E3"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const MassagePlusIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      onPress={onPress}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width="48" height="48" rx="24" fill="#4AB5E3" />
      <Path
        d="M24 17V31"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M17 23.957H31"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const MassageCameraIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      onPress={onPress}
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M19 5.23099C19 4.86377 18.8541 4.51159 18.5945 4.25192C18.3348 3.99226 17.9826 3.84638 17.6154 3.84638H14.8462L12.7692 1.07715H7.23077L5.15385 3.84638H2.38462C2.01739 3.84638 1.66521 3.99226 1.40554 4.25192C1.14588 4.51159 1 4.86377 1 5.23099V13.5387C1 13.9059 1.14588 14.2581 1.40554 14.5178C1.66521 14.7774 2.01739 14.9233 2.38462 14.9233H17.6154C17.9826 14.9233 18.3348 14.7774 18.5945 14.5178C18.8541 14.2581 19 13.9059 19 13.5387V5.23099Z"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M9.99991 11.8079C11.7205 11.8079 13.1153 10.4131 13.1153 8.69253C13.1153 6.97195 11.7205 5.57715 9.99991 5.57715C8.27933 5.57715 6.88452 6.97195 6.88452 8.69253C6.88452 10.4131 8.27933 11.8079 9.99991 11.8079Z"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const MassageDocumentIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      onPress={onPress}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M16.6153 17.6154C16.6153 17.9826 16.4694 18.3348 16.2097 18.5945C15.9501 18.8541 15.5979 19 15.2307 19H2.76914C2.40191 19 2.04973 18.8541 1.79007 18.5945C1.5304 18.3348 1.38452 17.9826 1.38452 17.6154V2.38462C1.38452 2.01739 1.5304 1.66521 1.79007 1.40554C2.04973 1.14588 2.40191 1 2.76914 1H9.69221L16.6153 7.92308V17.6154Z"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M5.53857 6.53857H8.3078"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M5.53857 10.6924H12.4617"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M5.53857 14.8462H12.4617"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const MassageMediaIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      onPress={onPress}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M17.6154 1H2.38462C1.61991 1 1 1.61991 1 2.38462V17.6154C1 18.3801 1.61991 19 2.38462 19H17.6154C18.3801 19 19 18.3801 19 17.6154V2.38462C19 1.61991 18.3801 1 17.6154 1Z"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.90918 14.9293V9.62619C7.91305 9.54469 7.93686 9.46539 7.97853 9.39525C8.0202 9.3251 8.07845 9.26626 8.14817 9.22388C8.21789 9.1815 8.29694 9.15689 8.3784 9.15219C8.45985 9.1475 8.54121 9.16287 8.61533 9.19696L13.2123 11.8416C13.2867 11.8874 13.3482 11.9516 13.3908 12.0279C13.4334 12.1043 13.4558 12.1903 13.4558 12.2777C13.4558 12.3652 13.4334 12.4512 13.3908 12.5275C13.3482 12.6038 13.2867 12.668 13.2123 12.7139L8.61533 15.3723C8.53993 15.4033 8.45821 15.4159 8.37698 15.409C8.29574 15.402 8.21734 15.3758 8.14828 15.3325C8.07922 15.2891 8.02149 15.2299 7.97991 15.1598C7.93832 15.0897 7.91408 15.0106 7.90918 14.9293V14.9293Z"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M1 5.84619H19"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M5.84619 5.84615L7.92311 1"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12.0769 5.84615L14.1538 1"
        stroke="#08101F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
const MassageEmptyScreenIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle cx="36" cy="36" r="36" fill="#EDEFFD" />
      <Path
        d="M36 20C46.6667 20 52 25.6218 52 34.0629C52 39.4858 49.7846 43.7395 45.3703 46.086C46.1908 48.8887 48.2174 50.5387 46.4369 52.3381C45.28 53.5072 38.4123 53.6813 36.0903 48.1175H36C25.3333 48.1175 20 42.4957 20 34.0629C20 25.6301 25.3333 20 36 20Z"
        fill="url(#paint0_linear_918_30545)"
        stroke="#4A59E3"
        stroke-miterlimit="10"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_918_30545"
          x1="58.5801"
          y1="10.9415"
          x2="2.13619"
          y2="57.2744"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stop-color="#92D3EE" />
          <Stop offset="1" stop-color="#929CEE" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};
const FacilitySearchIcon = ({ style, onPress }) => {
  return (
    <Svg
      style={style}
      onPress={onPress}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M8.50468 16.0092C12.6494 16.0092 16.0093 12.6493 16.0093 8.50462C16.0093 4.35993 12.6494 1 8.50468 1C4.35999 1 1.00006 4.35993 1.00006 8.50462C1.00006 12.6493 4.35999 16.0092 8.50468 16.0092Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.9999 18.9999L13.8076 13.8076"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
export {
  WhiteForwardarrowIcon,
  WhitedownarrowIcon,
  ForwardIcon,
  BackIcon,
  PenIcon,
  ErrorIcon,
  CityIcon,
  StateIcon,
  ZipIcon,
  CategoryIcon,
  PriceIcon,
  DurationIcon,
  AmenitiesIcon,
  CitySimpleIcon,
  StateSimpleIcon,
  ZipSimpleIcon,
  CategorySimpleIcon,
  AmenitiesSimpleIcon,
  PriceSimpleIcon,
  DurationSimpleIcon,
  LocationIcon,
  RatingIcon,
  BasketballIcon,
  RulesIcon,
  Grayforwardicon,
  MassageIcon,
  MassageSendIcon,
  MassagePlusIcon,
  MassageCameraIcon,
  MassageDocumentIcon,
  MassageMediaIcon,
  MassageEmptyScreenIcon,
  FacilitySearchIcon,
};
