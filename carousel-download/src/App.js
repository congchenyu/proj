import React from 'react';
import CarouselComponent from './CarouselComponent';
import './App.css';

var cloud = require('./cloud.png')

const slides = [
  {
      title: "Why the Sky is Blue",
      image: cloud,
  },
  {
      title: "The Science Behind the Blue Sky",
      content: "Discover the fascinating science behind the blue sky and why it appears the way it does!  The blue color of the sky is a result of the scattering of sunlight by the gases and particles in the Earth's atmosphere. When sunlight reaches the Earth's atmosphere, it is composed of different colors, each with a different wavelength. The shorter blue wavelengths are scattered more than the other colors, causing the blue light to be more dominant in the sky.  This scattering phenomenon, known as Rayleigh scattering, is more effective at shorter wavelengths, which is why the sky appears blue during the day. As the sun sets, the light has to pass through a thicker layer of the atmosphere, causing the blue light to scatter even more, resulting in the beautiful hues of red, orange, and pink during sunset."
  },
  {
      title: "Atmospheric Composition",
      content: "Explore the composition of the Earth's atmosphere and its role in creating the blue sky!  The Earth's atmosphere is primarily composed of nitrogen, oxygen, and other gases, along with tiny particles such as dust and water droplets. These components play a crucial role in the scattering of sunlight that leads to the blue sky phenomenon.  The scattering of sunlight by the atmospheric gases and particles is responsible for the sky's color, and the varying concentrations of these components at different altitudes contribute to the different shades of blue observed in the sky.",
  },
  {
      title: "Influence of Weather Conditions",
      content: "Learn how weather conditions impact the appearance of the blue sky and its color intensity!  Weather conditions such as humidity, air pollution, and the presence of clouds can affect the appearance and intensity of the blue sky. Higher humidity levels can cause the sky to appear paler, while lower humidity enhances the deep blue color.  Additionally, air pollution can scatter more light, leading to a whitish appearance of the sky, and the presence of clouds can diffuse sunlight, altering the perceived color of the sky.",
  },
  {
      title: "Beyond Earth's Atmosphere",
      content: "Delve into how the blue sky phenomenon differs on other planets and celestial bodies!  The blue sky phenomenon is unique to Earth due to its specific atmospheric composition and the scattering of sunlight. On other planets with different atmospheric compositions, such as Mars with its thin carbon dioxide atmosphere, the sky appears reddish during the day.  Furthermore, on celestial bodies like the moon, which lacks a significant atmosphere, the sky appears black even during the day, showcasing the intriguing variations in sky color across the universe.",
  },
  {
      title: "Appreciating the Beauty of Nature",
      content: "Join us in appreciating the natural wonder of the blue sky and the science that makes it possible!  The blue sky is not only a result of scientific principles but also a source of inspiration and wonder. Its ever-changing hues and the interplay of light and atmosphere remind us of the beauty and complexity of nature.  Next time you gaze at the blue sky, take a moment to appreciate the intricate processes that create this stunning phenomenon, and marvel at the natural artistry that surrounds us every day.",
  }
];

function App() {
  return (
      <div className="App">
          <CarouselComponent slides={slides} />
      </div>
  );
}

export default App;
