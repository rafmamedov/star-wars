import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {
  left?: boolean;
  color?: string;
  disabled: boolean;
};

export const ChevronIcon: React.FC<Props> = ({left, disabled}) =>
  left ? (
    <Svg width={24} height={24} fill="none" viewBox="0 0 24 24">
      <Path
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={disabled ? '#c2c9d6' : '#000'}
        d="m15 6-6 6 6 6"
      />
    </Svg>
  ) : (
    <Svg width={24} height={24} fill="none" viewBox="0 0 24 24">
      <Path
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9 6 6 6-6 6"
        stroke={disabled ? '#c2c9d6' : '#000'}
      />
    </Svg>
  );
