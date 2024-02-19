import React from "react";
import Svg, {
  Circle,
  Defs,
  Path,
  LinearGradient,
  Stop,
  Rect,
  Mask,
  G,
  Filter,
  FeFlood,
  FeColorMatrix,
  FeOffset,
  FeGaussianBlur,
  FeComposite,
  FeBlend,
  Use,
  ClipPath,
} from "react-native-svg";

export const OpenIcon = ({ style, fill, onPress }) => {
  return (
    <Svg
      style={style}
      dataSlot="icon"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <Path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
        fill="#1f7bed"
      />
    </Svg>
  );
};

export const CloseIcon = ({ style, fill, onPress }) => {
  return (
    <Svg
      style={style}
      dataSlot="icon"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <Path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
        fill="#1f7bed"
      />
    </Svg>
  );
};
export const ArrowDown = ({ style, fill, onPress }) => {
  return (
    <Svg
      style={style}
      dataSlot="icon"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <Path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
        fill="#1f7bed"
      />
    </Svg>
  );
};
export const ArrowUp = ({ style, fill, onPress }) => {
  return (
    <Svg
      style={style}
      dataSlot="icon"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <Path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
        fill="#1f7bed"
      />
    </Svg>
  );
};
export const PlusIcon = ({ style, fill, onPress }) => {
  return (
    <Svg
      style={style}
      dataSlot="icon"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <Path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
        fill="#fff"
      />
    </Svg>
  );
};
export const MinusIcon = ({ style, fill, onPress }) => {
  return (
    <Svg
      style={style}
      dataSlot="icon"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <Path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
        fill={fill}
      />
    </Svg>
  );
};
