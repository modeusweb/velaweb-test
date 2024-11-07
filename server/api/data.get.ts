import { defineEventHandler } from 'h3';
import { promises as fs } from 'fs';
import path from 'path';

// Утилита для загрузки JSON из файла
async function loadJsonFile(filename: string) {
  const filePath = path.resolve('public', filename);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

// Утилита для загрузки JSON с URL
async function loadJsonFromUrl(baseUrl: string, filename: string) {
  const url = `${baseUrl}/${filename}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  return response.json();
}

export default defineEventHandler(async () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const baseUrl = 'https://velaweb-test.vercel.app';
  const filenames = ['products.json', 'brands.json', 'l3-products.json'];

  const loaders = isDevelopment
    ? filenames.map((file) => loadJsonFile(file))
    : filenames.map((file) => loadJsonFromUrl(baseUrl, file));

  const [products, brands, configurableProducts] = await Promise.all(loaders);

  return { products, brands, configurableProducts };
});
