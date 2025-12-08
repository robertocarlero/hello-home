export interface Country {
  countryCode: string;
  countryName: string;
}

export interface GetCountriesResponse {
  countries: Country[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: string[][];
  };
  flow: string;
}
