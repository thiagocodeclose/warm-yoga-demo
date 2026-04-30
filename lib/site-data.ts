export const siteData = {
  gym: {
    name: 'Warm Studio',
    tagline: 'Hot Yoga & Infrared',
    location: 'Scottsdale, AZ',
    address: '7014 E Camelback Rd, Scottsdale, AZ 85251',
    phone: '(480) 555-0193',
    email: 'hello@warmstudio.com',
  },
  stats: [
    { value: '95°F', label: 'Studio Temperature' },
    { value: '60 min', label: 'Average Class Length' },
    { value: '12+', label: 'Class Styles' },
    { value: '7 Days', label: 'Week Schedule' },
  ],
  classes: [
    {
      name: 'Hot Vinyasa Flow',
      temp: '95°F',
      duration: '60 min',
      desc: 'A breath-linked flow sequence in our infrared-heated room. Build heat from the inside out — the warmth opens tissue and deepens every pose.',
    },
    {
      name: 'Infrared Yin',
      temp: '88°F',
      duration: '75 min',
      desc: 'Long-held passive poses with far-infrared radiant heat. Targets deep connective tissue, hips, and the spine. Profoundly restorative.',
    },
    {
      name: 'Hot Power',
      temp: '95°F',
      duration: '60 min',
      desc: 'Athletic sequencing, arm balances, inversions, and peak poses — all in the heat. For practitioners ready to push further.',
    },
    {
      name: 'Warm Restore',
      temp: '85°F',
      duration: '60 min',
      desc: 'Supported restorative postures with props, bolsters, and blankets. Perfect for recovery, stress relief, or your first warm class.',
    },
    {
      name: 'Morning Flow',
      temp: '90°F',
      duration: '45 min',
      desc: 'A shorter, energising sequence designed to wake the body. Starts slow, finishes strong. Offered daily at 6 AM and 7 AM.',
    },
    {
      name: 'Sculpt & Flow',
      temp: '88°F',
      duration: '60 min',
      desc: 'Yoga postures fused with light weights and toning intervals. Builds lean strength while keeping the meditative quality of a yoga class.',
    },
  ],
  benefits: [
    {
      title: 'Deeper Flexibility',
      desc: 'Infrared heat relaxes muscle fibre at a cellular level — you can go deeper, safer, and recover faster than in any unheated practice.',
    },
    {
      title: 'Detoxification',
      desc: 'Far-infrared wavelengths penetrate 2–3 inches below the skin surface, releasing toxins stored in fat cells through sweat.',
    },
    {
      title: 'Caloric Burn',
      desc: 'A single 60-minute hot yoga session can burn 400–600 calories. The heat elevates heart rate equivalent to moderate cardio exercise.',
    },
    {
      title: 'Stress Relief',
      desc: 'Heat triggers parasympathetic nervous system response. Students consistently report better sleep, reduced anxiety, and mental clarity.',
    },
  ],
  pricing: [
    {
      name: 'Drop-In',
      price: '$28',
      period: 'single class',
      features: ['Any class format', 'All temperatures', 'Mat & towel rental available', 'Online booking'],
      highlight: false,
    },
    {
      name: 'Unlimited',
      price: '$149',
      period: 'per month',
      features: ['Unlimited classes', 'All formats & temperatures', 'Priority booking', 'One free guest pass / month', 'Member events'],
      highlight: true,
    },
    {
      name: 'Class Pack',
      price: '$199',
      period: '10 classes · 90 days',
      features: ['10 classes to use', 'Any format', '90-day validity', 'Shareable with family', 'No expiry extensions'],
      highlight: false,
    },
  ],
};
