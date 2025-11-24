import { NewsItem } from './types';
import { processNewsItems } from './processItems';

export function extractNewsFromResponse(responseData: any): NewsItem[] {
  if (responseData && Array.isArray(responseData)) {
    return processNewsItems(responseData);
  } else if (responseData?.data?.results && Array.isArray(responseData.data.results)) {
    return processNewsItems(responseData.data.results);
  } else if (responseData?.data && Array.isArray(responseData.data)) {
    return processNewsItems(responseData.data);
  } else if (responseData?.news && Array.isArray(responseData.news)) {
    return processNewsItems(responseData.news);
  } else if (responseData?.articles && Array.isArray(responseData.articles)) {
    return processNewsItems(responseData.articles);
  } else if (responseData?.results && Array.isArray(responseData.results)) {
    return processNewsItems(responseData.results);
  }
  
  return [];
}