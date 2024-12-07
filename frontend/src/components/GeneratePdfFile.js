import { PDFDownloadLink } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import Download_Icon from "../images/download_icon.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: "25px",
  },
  section: {
    margin: 8,
    padding: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: "bold",
    textDecoration: "underline",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  body: {
    fontSize: 12,
    lineHeight: 1.5,
  },
});

const MyPdfDocument = ({ predictedDiseaseData }) => {
  if (!predictedDiseaseData) {
    return <Text>No data available</Text>;
  }

  const renderList = (data, title) => (
    <View style={styles.section}>
      <Text style={styles.subtitle}>{title}:</Text>
      {data.map((item, index) => (
        <Text key={index} style={styles.body}>
          {item}
        </Text>
      ))}
    </View>
  );

  return (
    <Document>
      <Page style={styles.page}>
        <View style={{ position: "absolute", top: "40%", left: "20%" }}>
          <Text style={{ fontSize: 72, color: "rgba(0, 0, 0, 0.15)", transform: "rotate(-45deg)" }}>
            AgroNexus
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Disease Details Report</Text>
          <Text style={styles.subtitle}>
            Plant Name: {predictedDiseaseData.plant_name || "Not available"}
          </Text>
          <Text style={styles.subtitle}>
            Disease Name: {predictedDiseaseData.disease_name || "Not available"}
          </Text>
        </View>

        {predictedDiseaseData.disease_symptoms && renderList(predictedDiseaseData.disease_symptoms, "Symptoms")}
        {predictedDiseaseData.disease_causes && renderList(predictedDiseaseData.disease_causes, "Causes")}
        {predictedDiseaseData.disease_prevention &&
          renderList(predictedDiseaseData.disease_prevention, "Prevention")}
        {predictedDiseaseData.disease_control && renderList(predictedDiseaseData.disease_control, "Control")}
      </Page>
    </Document>
  );
};

const GeneratePdfFile = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <PDFDownloadLink document={<MyPdfDocument predictedDiseaseData={data} />} fileName="disease-details.pdf">
      <img className="download-icon" src={Download_Icon} alt="Download" />
    </PDFDownloadLink>
  );
};

export default GeneratePdfFile;
