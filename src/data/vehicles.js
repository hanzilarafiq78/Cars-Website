/* ==========================================================================
   VANTA — Vehicle Data Configuration
   Each vehicle defines its chapter content, specs, lighting, and camera config.
   ========================================================================== */

export const vehicles = [
  {
    id: 'x1',
    chapter: '01',
    category: 'SUPERCAR',
    name: 'VANTA X1',
    headline: ['A NEW', 'ERA.'],
    editorialWord: 'ERA.',
    heroHeadline: ['PURE', 'PERFORMANCE.'],
    heroEditorialWord: 'PERFORMANCE.',
    heroSubtitle: 'Aerodynamic excellence forged in carbon.',
    performance: {
      hp: { value: 612, unit: 'HP', label: 'POWER OUTPUT' },
      accel: { value: 3.1, unit: 'SEC', label: '0–100 KM/H' },
      topSpeed: { value: 320, unit: 'KM/H', label: 'TOP SPEED' },
    },
    design: {
      headline: ['AERODYNAMIC', 'EXCELLENCE.'],
      editorialWord: 'EXCELLENCE.',
      subheadlines: [],
      details: [
        'Carbon fiber body',
        'Active aerodynamic surfaces',
        'Forged alloy wheels',
        'Adaptive LED lighting',
        'Sculpted bodywork',
      ],
    },
    technology: {
      headline: ['ENGINEERED', 'PRECISION'],
      features: [
        { label: 'POWERTRAIN', name: 'Hybrid Powertrain' },
        { label: 'AERO', name: 'Active Aerodynamics' },
        { label: 'COOLING', name: 'Advanced Cooling' },
        { label: 'CHASSIS', name: 'Carbon Monocoque' },
        { label: 'CONTROL', name: 'Performance Control System' },
      ],
    },
    specs: [
      { number: 612, unit: 'HP', description: 'POWER OUTPUT' },
      { number: 3.1, unit: 'SEC', description: '0–100 KM/H', decimals: 1 },
      { number: 320, unit: 'KM/H', description: 'TOP SPEED' },
    ],
    lighting: {
      keyIntensity: 2.5,
      rimIntensity: 3.0,
      keyColor: '#ffffff',
      rimColor: '#e8e8ff',
      mood: 'aggressive',
    },
    camera: {
      initialDistance: 8,
      height: 1.2,
      fov: 45,
    },
    model: {
      type: 'supercar',
      scale: 1.0,
      bodyColor: '#1a1a1a',
      accentColor: '#2a2a2a',
      glbPath: null, // Replace with '/models/vanta-x1.glb' when available
    },
  },
  {
    id: 's7',
    chapter: '02',
    category: 'LUXURY',
    name: 'VANTA S7',
    headline: ['REFINED', 'LUXURY.'],
    editorialWord: 'LUXURY.',
    performance: {
      hp: { value: 580, unit: 'HP', label: 'POWER OUTPUT' },
      accel: { value: 4.2, unit: 'SEC', label: '0–100 KM/H' },
      range: { value: 720, unit: 'KM', label: 'RANGE' },
    },
    design: {
      headline: ['ACOUSTIC', 'TRANQUILITY.'],
      editorialWord: 'TRANQUILITY.',
      subheadlines: [],
      details: [
        'Hand-stitched leather',
        'Ambient interior lighting',
        'Panoramic glass roof',
        'Acoustic cabin isolation',
        'Executive seating',
      ],
    },
    technology: {
      headline: ['SENSORY', 'COCKPIT'],
      features: [
        { label: 'COCKPIT', name: 'Intelligent Cockpit' },
        { label: 'SUSPENSION', name: 'Adaptive Suspension' },
        { label: 'CONNECTIVITY', name: 'Connected Systems' },
        { label: 'ACOUSTICS', name: 'Acoustic Cabin' },
        { label: 'ASSIST', name: 'Driver Assistance' },
      ],
    },
    specs: [
      { number: 580, unit: 'HP', description: 'POWER OUTPUT' },
      { number: 4.2, unit: 'SEC', description: '0–100 KM/H', decimals: 1 },
      { number: 720, unit: 'KM', description: 'RANGE' },
    ],
    lighting: {
      keyIntensity: 2.0,
      rimIntensity: 2.5,
      keyColor: '#fff5e6',
      rimColor: '#ffe8cc',
      mood: 'warm',
    },
    camera: {
      initialDistance: 9,
      height: 1.4,
      fov: 42,
    },
    model: {
      type: 'sedan',
      scale: 1.05,
      bodyColor: '#0f0f0f',
      accentColor: '#1a1a1a',
      glbPath: null,
    },
  },
  {
    id: 'r1',
    chapter: '03',
    category: 'SUV',
    name: 'VANTA R1',
    headline: ['ABSOLUTE', 'CAPABILITY.'],
    editorialWord: 'CAPABILITY.',
    performance: {
      hp: { value: 550, unit: 'HP', label: 'POWER OUTPUT' },
      accel: { value: 4.5, unit: 'SEC', label: '0–100 KM/H' },
      torque: { value: 800, unit: 'NM', label: 'TORQUE' },
    },
    design: {
      headline: ['COMMANDING', 'PRESENCE.'],
      editorialWord: 'PRESENCE.',
      subheadlines: [],
      details: [
        'Oversized alloy wheels',
        'Full LED signature lighting',
        'Panoramic roof',
        'Commanding grille',
        'Athletic bodywork',
      ],
    },
    technology: {
      headline: ['ADAPTIVE', 'INTELLIGENCE'],
      features: [
        { label: 'SUSPENSION', name: 'Adaptive Air Suspension' },
        { label: 'DRIVE', name: 'Intelligent Drive Systems' },
        { label: 'TERRAIN', name: 'Terrain Management' },
        { label: 'COCKPIT', name: 'Connected Cockpit' },
        { label: 'SAFETY', name: 'Safety Technology' },
      ],
    },
    specs: [
      { number: 550, unit: 'HP', description: 'POWER OUTPUT' },
      { number: 4.5, unit: 'SEC', description: '0–100 KM/H', decimals: 1 },
      { number: 800, unit: 'NM', description: 'TORQUE' },
    ],
    lighting: {
      keyIntensity: 2.2,
      rimIntensity: 3.5,
      keyColor: '#ffffff',
      rimColor: '#d8e8ff',
      mood: 'dramatic',
    },
    camera: {
      initialDistance: 10,
      height: 0.8,
      fov: 48,
    },
    model: {
      type: 'suv',
      scale: 1.15,
      bodyColor: '#121212',
      accentColor: '#1c1c1c',
      glbPath: null,
    },
  },
];
