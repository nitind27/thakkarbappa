import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Optionally, you could parse form data here if needed:
  // const form = await req.formData();

  // This is your static response object (copied from your PHP)
  const response = {
    screenShow: false,
    title: "!!  ITDP DEORI मोबाइल ॲप लोकार्पण समारोह  !!",
    desigTitle: "( आदिवासी योजनांची माहिती मिळणार आता आपल्या दारी )",
    udaghatakName: "मा.ना.श्री.धर्मरावबाबा आत्राम",
    udaghatakDesig: "( मंत्री , अन्न व औषध प्रशासन , म. रा. तथा पालकमंत्री , गोंदिया जिल्हा )",
    mukhyAtithiName: "",
    mukhyAtithiDesig: "",
    visheshAtithiName1: "मा.श्री.प्रफुल्ल पटेल",
    visheshAtithiDesig1: "( राज्यसभा सदस्य )",
    visheshAtithiName2: "मा.डॉ.श्री.नामदेव किरसान",
    visheshAtithiDesig2: "( लोकसभा सदस्य, गोंदिया-गडचिरोली )",
    visheshAtithiName3: "मा.प्रशांत पडोळे",
    visheshAtithiDesig3: "( लोकसभा सदस्य, भंडारा-गोंदिया )",
    visheshAtithiName4: "मा.श्री.परिणय फुके",
    visheshAtithiDesig4: "( आमदार विधान परिषद मतदार संघ )",
    visheshAtithiName5: "मा.श्री.सुधाकर अडबाले",
    visheshAtithiDesig5: "( आमदार शिक्षक मतदार संघ )",
    visheshAtithiName6: "मा.श्री.अभिजीत वंजारी",
    visheshAtithiDesig6: "( आमदार पदवीधर शिक्षक मतदार संघ )",
    visheshAtithiName7: "मा.श्री.विजय रहांगडाले",
    visheshAtithiDesig7: "आमदार तिरोडा विधानसभा क्षेत्र",
    visheshAtithiName8: "मा.श्री.मनोहर चंद्रिकापुरे",
    visheshAtithiDesig8: "आमदार मोरगांव, सडक अर्जुनी विधान सभा क्षेत्र",
    visheshAtithiName9: "मा.श्री.विनोद अग्रवाल",
    visheshAtithiDesig9: "आमदार गोंदिया विधान सभा क्षेत्र",
    visheshAtithiName10: "मा.श्री.सहषराम कोरोटे",
    visheshAtithiDesig10: "आमदार आमगाव-देवरी विधान सभा क्षेत्र",
    visheshAtithiName11: "मा.श्री.पंकज रहांगडाले",
    visheshAtithiDesig11: "( अध्यक्ष जि.प.गोंदिया )",
    pramukhAtithiName1: "मा.श्री. प्रजित नायर",
    pramukhAtithiDesig1: "( जिल्हाधिकारी,गोंदिया )",
    pramukhAtithiName2: "मा.श्री.गोरख भांमरे",
    pramukhAtithiDesig2: "( पोलिस अधिक्षक,गोंदिया )",
    pramukhAtithiName3: "मा.श्री. मुरुगानंथम. एम.",
    pramukhAtithiDesig3: "( मुख्य कार्यकारी अधिकारी,जि.प गोंदिया )",
    apeleAtithiName: "श्री.उमेश काशिद",
    apeleAtithiDesig: "प्रकल्प अधिकारी, एकात्मिक आदिवासी विकास प्रकल्प, देवरी जि. गोंदिया",
    datetime: "दिनांक : 14 ऑगष्ट, 2024 कार्यक्रमाची वेळ :- सकाळी 11.00 वाजता",
    address: "कार्यक्रम स्थळ :- जिल्हा नियोजन समिती सभागृह जिल्हाधिकारी कार्यालय, गोंदिया",
  };

  return NextResponse.json(response, { status: 200 });
}
