'use strict';

import { numberToDollars } from './number'

// TODO (Riley) : possibly remove undefined / null values from object?
export const makeStandard = (product) => ({
  title: product.strProductName || product.title,
  largeImageUrl: product.strLargeImage || product.largeImageUrl,
  mediumImageUrl: product.strMediumImage || product.mediumImageUrl,
  thumbImageUrl: product.strThumbnailImage || product.thumbnailImageUrl,
  productSku: product.strProductSKU || product.product_sku,
  shortDescription: product.txtShortDescription || product.shortDescription,
  longDescription: product.txtLongDescription || product.longDescription,
  category: product.strCategoryName || product.category,
  department: product.strDepartmentName || product.department,
  subCategory: product.strSubCategoryName || product.subcategory,
  merchant: product.strMerchantName || product.merchant,
  brandName: product.strBrandName || product.brandName,
  buyUrl: product.strBuyURL || '',
  price: parseFloat(product.dblProductPrice) || product.price,
  salePrice: parseFloat(product.dblProductSalePrice) || product.salePrice,
  clicks: null || product.clicks,
  commissions: null || '',
  numOfSales: null || product.num_of_sales,
})
