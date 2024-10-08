import React from 'react';

const features = [
  { id: 1, title: 'Fast Performance', description: 'Our platform is optimized for fast loading and smooth performance.', icon: '⚡️' },
  { id: 2, title: 'Secure Data', description: 'We prioritize the security of your data with industry-leading measures.', icon: '🔒' },
  { id: 3, title: 'User Friendly', description: 'Designed with simplicity in mind, our platform is easy to navigate.', icon: '👍' },
];

const Features = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="p-6 bg-white shadow-lg rounded-lg">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
