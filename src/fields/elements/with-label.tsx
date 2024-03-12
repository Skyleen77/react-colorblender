import { cn } from '../../helpers/utils';

interface WithLabelProps {
  label: string;
  hide: boolean;
  children: React.ReactNode;
}

export const WithLabel = ({ label, hide, children }: WithLabelProps) => {
  return (
    <div className="colorblender-picker-slider-wrapper">
      <div className={cn('colorblender-picker-slider-label', hide && 'hide')}>
        <p>{label}</p>
      </div>

      {children}
    </div>
  );
};
