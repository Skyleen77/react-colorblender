'use client';

import { ColorPicker, useColor } from 'react-colorblender';

export default function Home() {
  const [color, setColor] = useColor('#ff0000');

  return (
    <main className="flex h-screen">
      <div className="w-1/2 h-full flex items-center justify-center bg-gray-50">
        <ColorPicker color={color} onChange={setColor} className="shadow" />
      </div>

      <div className="w-1/2 h-full flex items-center justify-center bg-black">
        <ColorPicker
          color={color}
          onChange={setColor}
          className="shadow dark"
        />
      </div>
    </main>
  );
}
