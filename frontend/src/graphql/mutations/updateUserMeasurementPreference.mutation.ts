import gql from 'graphql-tag'

export default gql`
  mutation updateMeasurementPreference($measurementPreference: String!) {
    updateMeasurementPreference(measurementPreference: $measurementPreference) {
      measurementPreference
    }
  }
`
