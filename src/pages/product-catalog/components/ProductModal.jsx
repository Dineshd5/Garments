import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ProductModal = ({ product, onClose, getStockStatusColor }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVariant, setSelectedVariant] = useState(0);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'specifications', label: 'Specifications', icon: 'FileText' },
    { id: 'variants', label: 'Variants', icon: 'Grid3X3' },
    { id: 'pricing', label: 'Pricing', icon: 'DollarSign' }
  ];

  const pricingTiers = [
    { quantity: '50-99', price: product.basePrice, discount: '0%' },
    { quantity: '100-249', price: (product.basePrice * 0.95).toFixed(2), discount: '5%' },
    { quantity: '250-499', price: (product.basePrice * 0.90).toFixed(2), discount: '10%' },
    { quantity: '500+', price: (product.basePrice * 0.85).toFixed(2), discount: '15%' }
  ];

  const variantImages = [
    product.image,
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400"
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-1300 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-elevation-3 w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-semibold text-text-primary">
              {product.name}
            </h2>
            {product.isNew && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent-100 text-accent-700">
                New Product
              </span>
            )}
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStockStatusColor(product.availability)}`}>
              {product.availability}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-secondary-600 hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-colors duration-150"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          {/* Left Side - Image Gallery */}
          <div className="w-1/2 p-6 border-r border-border">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="w-full h-80 bg-secondary-100 rounded-lg overflow-hidden">
                <Image
                  src={variantImages[selectedVariant]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2">
                {variantImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(index)}
                    className={`w-full h-20 bg-secondary-100 rounded-lg overflow-hidden border-2 transition-colors duration-150 ${
                      selectedVariant === index ? 'border-primary-500' : 'border-transparent hover:border-secondary-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} variant ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Quick Info */}
              <div className="bg-secondary-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-text-secondary">SKU:</span>
                    <span className="ml-2 font-medium text-text-primary">{product.sku}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Category:</span>
                    <span className="ml-2 font-medium text-text-primary">{product.category}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Stock Level:</span>
                    <span className="ml-2 font-medium text-text-primary">{product.stockLevel}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Production Time:</span>
                    <span className="ml-2 font-medium text-text-primary">{product.productionTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="w-1/2 flex flex-col">
            {/* Tab Navigation */}
            <div className="flex border-b border-border">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors duration-150 ${
                    activeTab === tab.id
                      ? 'text-primary-600 border-b-2 border-primary-600' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-3">Description</h3>
                    <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                      {product.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-3">Available Sizes</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map(size => (
                        <span
                          key={size}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary-100 text-secondary-700"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-3">Available Colors</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map(color => (
                        <span
                          key={color}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-3">Key Features</h3>
                    <ul className="space-y-2 text-text-secondary">
                      <li className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success-600" />
                        <span>Premium {product.fabricType} construction</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success-600" />
                        <span>Available in {product.variants} different variants</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success-600" />
                        <span>Minimum order quantity: {product.minimumOrder} pieces</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success-600" />
                        <span>Production time: {product.productionTime}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Technical Specifications</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between py-3 border-b border-border-light">
                          <span className="text-text-secondary capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <span className="font-medium text-text-primary">{value}</span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between py-3 border-b border-border-light">
                        <span className="text-text-secondary">Fabric Type:</span>
                        <span className="font-medium text-text-primary">{product.fabricType}</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-border-light">
                        <span className="text-text-secondary">Production Time:</span>
                        <span className="font-medium text-text-primary">{product.productionTime}</span>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <span className="text-text-secondary">Minimum Order:</span>
                        <span className="font-medium text-text-primary">{product.minimumOrder} pieces</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Care Instructions</h3>
                    <ul className="space-y-2 text-text-secondary">
                      <li className="flex items-center space-x-2">
                        <Icon name="Droplets" size={16} className="text-primary-600" />
                        <span>Machine wash cold with like colors</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="Sun" size={16} className="text-primary-600" />
                        <span>Tumble dry low or hang dry</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="Zap" size={16} className="text-primary-600" />
                        <span>Iron on low heat if needed</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="X" size={16} className="text-error-600" />
                        <span>Do not bleach or dry clean</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'variants' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Size & Color Matrix</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border border-border rounded-lg">
                        <thead className="bg-secondary-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">Size</th>
                            {product.colors.slice(0, 4).map(color => (
                              <th key={color} className="px-4 py-3 text-center text-sm font-medium text-text-secondary">
                                {color}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {product.sizes.map(size => (
                            <tr key={size}>
                              <td className="px-4 py-3 text-sm font-medium text-text-primary">{size}</td>
                              {product.colors.slice(0, 4).map(color => (
                                <td key={color} className="px-4 py-3 text-center">
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-700">
                                    Available
                                  </span>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Variant SKUs</h3>
                    <div className="space-y-2">
                      {product.sizes.slice(0, 3).map((size, index) => (
                        <div key={size} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                          <div>
                            <span className="font-medium text-text-primary">{product.sku}-{size}</span>
                            <span className="ml-2 text-sm text-text-secondary">({size} - {product.colors[0]})</span>
                          </div>
                          <span className="text-sm text-text-secondary">Stock: {Math.floor(Math.random() * 50) + 10}</span>
                        </div>
                      ))}
                      <button className="w-full p-3 text-sm text-primary-600 hover:text-primary-700 border border-primary-200 hover:border-primary-300 rounded-lg transition-colors duration-150">
                        View All {product.variants} Variants
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'pricing' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Quantity-Based Pricing</h3>
                    <div className="space-y-3">
                      {pricingTiers.map((tier, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                          <div>
                            <span className="font-medium text-text-primary">{tier.quantity} pieces</span>
                            {tier.discount !== '0%' && (
                              <span className="ml-2 text-sm text-success-600">({tier.discount} off)</span>
                            )}
                          </div>
                          <span className="text-lg font-semibold text-text-primary">${tier.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">Additional Costs</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <span className="text-text-secondary">Setup Fee (one-time)</span>
                        <span className="font-medium text-text-primary">$25.00</span>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <span className="text-text-secondary">Custom Design Fee</span>
                        <span className="font-medium text-text-primary">$15.00</span>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <span className="text-text-secondary">Rush Order (24-48h)</span>
                        <span className="font-medium text-text-primary">+25%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary-50 rounded-lg p-4">
                    <h4 className="font-semibold text-primary-700 mb-2">Volume Discounts Available</h4>
                    <p className="text-sm text-primary-600">
                      Contact our sales team for custom pricing on orders over 1,000 pieces or for long-term partnerships.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-border p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-text-secondary">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
                <div className="flex items-center space-x-3">
                  <button className="btn-secondary">
                    <Icon name="Edit" size={16} className="mr-2" />
                    Edit Product
                  </button>
                  <button className="btn-primary">
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    Add to Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
