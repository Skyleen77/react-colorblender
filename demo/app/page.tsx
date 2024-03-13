'use client';

import { ColorPicker } from '../../src/color-picker';
import { useColor } from '../../src/hooks/useColor';

export default function Home() {
  const [color, setColor] = useColor('#ff0000');

  return (
    <main className="flex h-screen">
      <div className="w-1/2 h-full flex items-center justify-center bg-gray-50">
        <ColorPicker
          color={color}
          onChange={setColor}
          className="border border-gray-200"
        />
      </div>

      <div className="w-1/2 h-full flex items-center justify-center bg-black">
        <ColorPicker
          color={color}
          onChange={setColor}
          className="border border-gray-700 dark"
        />
      </div>
    </main>
  );
}
