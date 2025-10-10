import { type ComponentType, type ReactElement } from 'react';

// Generic props that most icon libraries accept
interface BaseIconProps {
  size?: number | string;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}

export interface IconProps extends BaseIconProps {
  icon: ComponentType<BaseIconProps>;
}

export const Icon = ({
  icon: IconComponent,
  size = 16,
  className = '',
  color,
  style,
  ...props
}: IconProps): ReactElement => {
  return (
    <IconComponent
      size={size}
      className={className}
      color={color}
      style={style}
      {...props}
    />
  );
};
