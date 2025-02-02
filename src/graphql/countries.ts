import { gql } from "@apollo/client";

// GraphQL query untuk mengambil daftar negara
export const GET_COUNTRIES = gql`
    query GetCountries {
        countries {
            code        
            name        
            capital     
            currency    
            emoji       
            languages { 
                name
            }
        }
    }
`;

// GraphQL query untuk mendapatkan data negara berdasarkan kode negara
export const GET_COUNTRIES_BY_CODE = gql`
    query GetCountryByCode($code: String!) {
        countries(filter: { code: { eq: $code } }) {
            code
            name
            capital
            currency
            emoji
            continent {
                name
            }
            languages {
                name
            }
        }
    }
`;