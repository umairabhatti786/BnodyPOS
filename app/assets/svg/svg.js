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
import AppColor from "../../constant/AppColor";

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
export const PowerIcon = ({ style, fill, onPress }) => {
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
        d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.166 5.106a.75.75 0 0 1 0 1.06 8.25 8.25 0 1 0 11.668 0 .75.75 0 1 1 1.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 0 1 1.06 0Z"
        fill="#fff"
      />
    </Svg>
  );
};
export const Tag = ({ style, fill, onPress }) => {
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
        d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
        fill="#fff"
      />
    </Svg>
  );
};
export const SettingIcon = ({ style, fill, onPress }) => {
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
        d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
        fill="#fff"
      />
    </Svg>
  );
};
export const DownIcon = ({ style, fill, onPress }) => {
  return (
    <Svg
      style={style}
      dataSlot="icon"
      fill="#000000"
      strokeWidth={1.5}
      stroke="#000000"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
        fill="#000000"
      />
    </Svg>
  );
};
export const UpIcon = ({ style, fill, onPress }) => {
  return (
    <Svg
      style={style}
      dataSlot="icon"
      fill="#000000"
      strokeWidth={1.5}
      stroke="#000000"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 15.75 7.5-7.5 7.5 7.5"
        fill="#000000"
      />
    </Svg>
  );
};
