import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
export const ArrowIcon = () => (
  <Svg width={18} height={18} fill="none" viewBox="0 0 24 24">
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 5v14m0-14-6 6m6-6 6 6"
    />
  </Svg>
);
