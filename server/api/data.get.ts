import { defineEventHandler } from 'h3';
import { promises as fs } from 'fs';
import path from 'path';

// Утилита для загрузки JSON из файла
async function loadJsonFile(filename: string) {
  const filePath = path.resolve('public', filename);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export default defineEventHandler(async () => {
  const products = await loadJsonFile('products.json');
  const brands = await loadJsonFile('brands.json');
  const configurableProducts = await loadJsonFile('l3-products.json');

  return { products, brands, configurableProducts };
});
