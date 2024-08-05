const XLSX = require("xlsx");
const { create } = require("xmlbuilder2");
const path = require("path");
const fs = require("fs");

// Define the controller function for converting Excel to .S3D
const convertExcelToS3D = (req, res) => {
  const file = req.file;
  const startRow = req.body.startRow ? parseInt(req.body.startRow, 10) : 12;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    // Process the Excel file and generate XML
    const xml = processExcelFile(file.path, startRow);

    // Save the XML as .S3D
    const outputFileName = path.basename(
      file.originalname,
      path.extname(file.originalname)
    );
    const outputPath = saveAsS3DFile(xml, outputFileName);

    // Send the .S3D file as response
    res.download(outputPath, `${outputFileName}.S3D`, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).json({ message: "Error occurred while sending file." });
      }
    });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ message: "Error occurred while processing file." });
  }
};

// Function to process the Excel file and create XML
function processExcelFile(filePath, startRow = 12) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Assume the default row is 12 if no startRow is provided
  const rowIndex = startRow - 1; // Convert to zero-based index

  // Fetch row data
  const rowData = data[rowIndex];
  if (!rowData) throw new Error(`Row ${startRow} is empty or not found.`);

  // Extract values from the row (change indices as needed)
  const position = rowData[1] || "DefaultName";
  const board_name = rowData[2] || "";
  const material = rowData[3] || "";
  const th = rowData[4] || 1;
  const length = rowData[5] || 1;
  const width = rowData[6] || 1;
  const pc = rowData[7] || 1;
  const length_1 = rowData[8] || 1;
  const length_2 = rowData[9] || 1;
  const width_1 = rowData[10] || 1;
  const width_2 = rowData[11] || 1;
  const l_mat_1 = rowData[12] || "";
  const l_mat_2 = rowData[13] || "";
  const w_mat_1 = rowData[14] || "";
  const w_mat_2 = rowData[15] || "";
  const cnc_1 = rowData[16] || "";
  const cnc_2 = rowData[17] || "";
  const note_1 = rowData[18] || "";
  const note_2 = rowData[19] || "";

  const str_0 = l_mat_1 === "" ? false : true;
  const str_1 = l_mat_2 === "" ? false : true;
  const str_2 = w_mat_1 === "" ? false : true;
  const str_3 = w_mat_2 === "" ? false : true;

  // Build XML
  const xml = create({ version: "1.0", encoding: "UTF-8" })
    .ele("PROJECTFILE", {
      FILE: "C:UsersJosipDesktopkuhinja.S3D",
      VER: "16",
      THS: ",",
      DCS: ".",
      PRVNO: "100",
      SLAG: "1",
    })
    .ele("SOBA", {
      SIRINA: "5",
      DUZINA: "5",
      VISINA: "5",
      VISINALOW: "5",
      ZDT: "1458",
      ZGT: "1457",
      PT: "1456",
      ST: "1392",
      ZDNAME: "ZP_b66",
      ZGNAME: "ZP_b65",
      PNAME: "ZP_b64",
      SNAME: "ZP_b00",
    })
    .up()
    .ele("SVJETLO", {
      AMB1: "0",
      LIH: "50",
      CAT: "25",
      LAT: "1",
      QAT: "1",
      SPCUT: "80",
      SPEXP: "100",
    })
    .up()
    .ele("KAMERA", {
      CAMTYPE: "1",
      CAMEX: "0",
      CAMEY: "1.64999997615814",
      CAMEZ: "2.5",
      CAMCX: "0",
      CAMCY: "0",
      CAMCZ: "0",
      CAMUX: "0",
      CAMUY: "0",
      CAMUZ: "0",
      CAMLIN: "0",
      CAMA1X: "0",
      CAMA1Z: "0",
      CAMAX: "0",
      CAMAY: "1.64999997615814",
      CAMAZ: "2",
      CAMAA: "0",
      CAMAAX: "15",
      CAMDIS: "5",
      CAMKUTX: "180.100006103516",
      CAMKUTY: "-1",
      CAMOY: "1.64999997615814",
    })
    .up()
    .ele("INFO")
    .txt(
      "07105450726F6A6563744F706973446174610102000602555103EF380603646174111E4C27C810B9E54006036176610500000000000000000000060372616202000603627270120000000006046272726E120000000006046964776E120000000006036F706912000000000604706B757A0200060370696C020106047064696E110000000000B9E54000"
    )
    .up()
    .ele("CREATOR", {
      ID: "0",
      USNAM: "",
      NAZIV: "",
      PREZ: "",
      OIB: "",
      ADRESA: "",
      GRAD: "",
      KONTAKT: "",
      TEL: "",
      MOB: "",
      EMAIL: "",
      RABAT: "0",
      MARZA: "0",
      TECAJ: "0",
      POJED: "",
      MJISP: "",
      VRK: "0",
      ZIRO: "",
      GRUPA: "",
      ZEMLJA: "",
      RABAT1: "0",
      RABAT2: "0",
      MARZA1: "0",
      MARZA2: "0",
    })
    .up()
    .ele("PUTANJA", {
      PATHINT: "10",
      PATHSPU: "50",
      PATHMAXS: "10",
      PATHSEG: "300",
      PATHTOCKE:
        '&quot;PTOCKA=0&quot;,&quot;PTSTYLE=1&quot;,&quot;PTANMODE=1&quot;,&quot;PTSEGCOUNT=300&quot;,&quot;PTX=1&quot;,&quot;PTZ=1&quot;,&quot;PTDEPTH=0&quot;,&quot;PTCLEN=0&quot;,&quot;PTS=0&quot;,&quot;PTPR0=1.55999994277954&quot;,&quot;PTPR1=1&quot;,&quot;PTPR2=0&quot;,&quot;PTNE0=0.439999997615814&quot;,&quot;PTNE1=1&quot;,&quot;PTNE2=0&quot;,&quot;PTOCKA=1&quot;,&quot;PTSTYLE=1&quot;,&quot;PTANMODE=1&quot;,&quot;PTSEGCOUNT=300&quot;,&quot;PTX=1&quot;,&quot;PTZ=0&quot;,&quot;PTDEPTH=1&quot;,&quot;PTCLEN=0&quot;,&quot;PTS=0&quot;,&quot;PTPR0=0&quot;,&quot;PTPR1=1&quot;,&quot;PTPR2=0.439999997615814&quot;,&quot;PTNE0=0&quot;,&quot;PTNE1=1&quot;,&quot;PTNE2=1.55999994277954&quot;,&quot;PTOCKA=2&quot;,&quot;PTSTYLE=1&quot;,&quot;PTANMODE=1&quot;,&quot;PTSEGCOUNT=300&quot;,&quot;PTX=1&quot;,&quot;PTZ=1&quot;,&quot;PTDEPTH=2&quot;,&quot;PTCLEN=0&quot;,&quot;PTS=0&quot;,&quot;PTPR0=0.439999997615814&quot;,&quot;PTPR1=1&quot;,&quot;PTPR2=2&quot;,&quot;PTNE0=1.55999994277954&quot;,&quot;PTNE1=1&quot;,&quot;PTNE2=2&quot;,&quot;PTOCKA=3&quot;,&quot;PTSTYLE=1&quot;,&quot;PTANMODE=1&quot;,&quot;PTSEGCOUNT=300&quot;,&quot;PTX=1&quot;,&quot;PTZ=2&quot;,&quot;PTDEPTH=1&quot;,&quot;PTCLEN=0&quot;,&quot;PTS=0&quot;,&quot;PTPR0=2&quot;,&quot;PTPR1=1&quot;,&quot;PTPR2=1.55999994277954&quot;,&quot;PTNE0=2&quot;,&quot;PTNE1=1&quot;,&quot;PTNE2=0.439999997615814&quot;,"',
    })
    .up()
    .ele("ELEMENT", {
      ECLAS: "TElement",
      ELVL: "0",
      ERC: "309136",
      ENAME: position,
      EKUT: "0",
      EXPOX: "0",
      EYPOS: "0",
      EZPOS: "560",
      EVISINA: "18",
      EDUBINA: "570",
      EDEBLJINA: "",
      ESIRINA: "750",
      ETIPE: "2",
      EVISIBLE: "true",
      EIMPORTNAME: "",
      ECIJENA: "",
      EEDITABLE: "true",
      ELOCKED: "false",
      ECJCOUNT: "false",
      EXF: "",
      EYF: "",
      EZF: "",
      EHF: "",
      ESF: "",
      EDF: "",
      EKXF: "",
      EKYF: "",
      EKZF: "",
      EKOL: pc,
      EXKUT: "0",
      EZKUT: "0",
      EOPIS: "",
      ENAPOMENA: "",
      EARTIKL: "false",
      EMINV: "0",
      EMINS: "0",
      EMIND: "0",
      EMAXV: "0",
      EMAXS: "0",
      EMAXD: "0",
      EKORAKV: "1",
      EKORAKS: "1",
      EKORAKD: "1",
      EVKON: "true",
      ESKON: "true",
      EDKON: "true",
      ELOCKV: "false",
      ELOCKS: "false",
      ELOCKD: "false",
      ELOCKN: "false",
      ELPWD: "",
      ELLWPWD: "",
      ESOFS: "0",
      EDOFS: "0",
      EZID: "10008",
      EZIDIND: "0",
      ETIPIZCJ: "1",
      ECHIBRID: "false",
      ELOG: "CRP89;122;110;81;86;38;87;83;121;69;110;110;46;92;",
      ESIFRA: "%NE%",
      EDEFVIS: "0",
      EDEFDUB: "0",
      EDEFSIR: "0",
      EMODEL: "-1",
      EFIXM: "false",
      EDEMOON: "false",
      ESMKU: "0",
      ETIPKU: "0",
      EDPVE: "true",
      EDPVKUE: "true",
      EDPYE: "true",
      EPPUE: "0",
      EPVNS: "false",
      EIVNE: "100",
      EIDVR: "0",
      EEVENT: "OnChange=,OnInsert=,OnLoad=,OnSelect=,OnGetPrice=",
      EJPD: "true",
      EEZEV: "false",
      EANCH: "7",
      EPRINT: "true",
      EPRINTCH: "true",
      NETPRICERAB: "0",
      NETPRICEMAR: "0",
    })
    .ele("SELBOX")
    .txt(
      "070D5473656C656374696F6E426F780102000602555103F0380603707473000000000000000000000000000000000000000000F1380000F2380000F3380000F4380000F5380000F6380000F7380000F8380000F9380000FA380000FB380000FC380000FD380000FE380000FF38000000390000013900000239000003390000043900000539000000"
    )
    .up()
    .ele("EVAR", { VAR0: "" })
    .up()
    .ele("EFVK", {
      EVARK0: "materijali,kom,1,CB_MatPrice,",
      EVARK1: "traka,kom,1,CB_EdgePrice,",
      EVARK2: "okovi,kom,1,CB_FitPrice,",
      EVARK3: "otpad,kom,0.2,CB_MatPrice,",
      EVARK4: "krojenje,kom,0.2,CB_MatPrice,",
      EVARK5: "&quot;spajanje elemenata&quot;,kom,1,30,",
      EVARK6: "&quot;montaza ladice&quot;,kom,CB_DrawQty,20,",
      EVARK7: "zarada,kom,1,2*(CB_MatPrice+CB_EdgePrice),",
    })
    .ele("FVKVAR", { VAR0: "B=VISINA", VAR1: "L=ŠIRINA", VAR2: "D=DEBLJINA" })
    .up()
    .up()
    .ele("SCMENU")
    .up()
    .ele("ACCGRP")
    .up()
    .ele("DASKE", { DCOUNT: "1" })
    .ele("AD", {
      DNAME: board_name,
      ROTGOD: "false",
      DKUT: "0",
      DXPOS: "0",
      DYPOS: "0",
      DZPOS: "0",
      VISINA: length,
      DUBINA: width,
      DEBLJINA: th,
      SMJER: "2",
      TIPDASKE: "0",
      FIXTEX: "false",
      VISIBLE: "true",
      BOJA: "10066329",
      PROZIRNO: "false",
      TIPFRONTE: "0",
      XF: "",
      YF: "",
      ZF: "",
      HF: "",
      SF: "",
      DF: "",
      XKUT: "0",
      ZKUT: "0",
      TEXIND: "34",
      MATFOLDER: "",
      MATNAME: material,
      IGNOREGOD: "false",
      PRIMJEDBA: "",
      PROGRAM: cnc_1,
      KXF: "",
      KYF: "",
      KZF: "",
      ARTIKL: "false",
      DSIFRA: "%NE%",
      PROGRAM1: cnc_2,
      PRIMJEDBALIST: "",
      PRDEBLJINA: "0",
      INHFR: "false",
      RUNKOLICINA: "0",
      EIDVR: "0",
      PROIZVODISE: "0",
      DANCH: "7",
    })
    .ele("SELBOX")
    .txt(
      "070D5473656C656374696F6E426F780102000602555103063906037074730000000000000000000000000000000000000000000739000008390000093900000A3900000B3900000C3900000D3900000E3900000F390000103900001139000012390000133900001439000015390000163900001739000018390000193900001A3900001B39000000"
    )
    .up()
    .ele("POTROSNI", { COUNT: "4" })
    .ele("POTITEM", {
      TIP: "0",
      INDEX: "0",
      STR0: "true",
      STR1: "false",
      STR2: "false",
      STR3: "false",
      MATN: l_mat_1,
      NAZIV: "ABS 1 mm_laser",
      TIPD: "0",
    })
    .up()
    .ele("DEFTRITEM", {
      INDEX: "0",
      STR0: "true",
      STR1: "false",
      STR2: "false",
      STR3: "false",
      MATN: l_mat_1,
      NAZIV: "ABS 1 mm_laser",
      TIPD: "0",
    })
    .up()
    .ele("POTITEM", {
      TIP: "0",
      INDEX: "0",
      STR0: "false",
      STR1: "true",
      STR2: "false",
      STR3: "false",
      MATN: l_mat_2,
      NAZIV: "ABS 1 mm_laser",
      TIPD: "0",
    })
    .up()
    .ele("DEFTRITEM", {
      INDEX: "0",
      STR0: "false",
      STR1: "true",
      STR2: "false",
      STR3: "false",
      MATN: l_mat_2,
      NAZIV: "ABS 1 mm_laser",
      TIPD: "0",
    })
    .up()
    .ele("POTITEM", {
      TIP: "0",
      INDEX: "0",
      STR0: "false",
      STR1: "false",
      STR2: "true",
      STR3: "false",
      MATN: w_mat_1,
      NAZIV: "ABS 1 mm_laser",
      TIPD: "0",
    })
    .up()
    .ele("DEFTRITEM", {
      INDEX: "0",
      STR0: "false",
      STR1: "false",
      STR2: "true",
      STR3: "false",
      MATN: w_mat_1,
      NAZIV: "ABS 1 mm_laser",
      TIPD: "0",
    })
    .up()
    .ele("POTITEM", {
      TIP: "0",
      INDEX: "0",
      STR0: "false",
      STR1: "false",
      STR2: "false",
      STR3: "true",
      MATN: w_mat_2,
      NAZIV: "ABS 1 mm_laser",
      TIPD: "0",
    })
    .up()
    .ele("DEFTRITEM", {
      INDEX: "0",
      STR0: "false",
      STR1: "false",
      STR2: "false",
      STR3: "true",
      MATN: w_mat_2,
      NAZIV: "ABS 1 mm_laser",
      TIPD: "0",
    })
    .up()
    .up()
    .up()
    .ele("PLANES")
    .txt(
      "071054506C616E65436F6C6C656374696F6E01020006025551031C390606706C616E6573020501070354425001020106025551031D39060364697200000000000000000000803F0000000006027570000000000000803F000000000000000006047368706C0706545348434F4C01020106025551031E3906057368636E74020101070C54536861706553717561726501020106025551031F390606707473636E74020401070F54536861706550617468506F696E74010201060255510320390605706B696E6402010603706F7300401CC50000000000401CC500070F54536861706550617468506F696E74010201060255510321390605706B696E6402010603706F7300401C450000000000401CC500070F54536861706550617468506F696E74010201060255510322390605706B696E6402010603706F7300401C450000000000401C4500070F54536861706550617468506F696E74010201060255510323390605706B696E6402010603706F7300401CC50000000000401C4500000605636F6C6F724694163FDB8A0D3FB072083F0000803F0603636C6F090603706F7300401C450000000000401C4506046364656C0806047069636B0906036E7063080602667705000000000000409C0B400602666805000000000000409C0B4000000006046B6F746C0709544B6F74614C6973740102010602555103243906056B74636E74020001000000070354425001020106025551032539060364697200000080000080BF00000080000000000602757000000000000000800000803F0000000006047368706C0706545348434F4C0102010602555103263906057368636E74020101070C545368617065537175617265010201060255510327390606707473636E74020401070F54536861706550617468506F696E74010201060255510328390605706B696E6402010603706F7300401CC5000000000080A2C400070F54536861706550617468506F696E74010201060255510329390605706B696E6402010603706F7300401C45000000000080A2C400070F54536861706550617468506F696E7401020106025551032A390605706B696E6402010603706F7300401C45000000000080A24400070F54536861706550617468506F696E7401020106025551032B390605706B696E6402010603706F7300401CC5000000000080A24400000605636F6C6F724694163FDB8A0D3FB072083F0000803F0603636C6F090603706F7300401C45000000000080A2C406046364656C0806047069636B0806036E7063080602667705000000000000409C0B40060266680500000000000080A20A4000000006046B6F746C0709544B6F74614C69737401020106025551032C3906056B74636E74020001000000070354425001020106025551032D39060364697200000080000080BF0000008000000000060275700000803F00000080000000800000000006047368706C0706545348434F4C01020106025551032E3906057368636E74020101070C54536861706553717561726501020106025551032F390606707473636E74020401070F54536861706550617468506F696E74010201060255510330390605706B696E6402010603706F7300401CC5000000000080A2C400070F54536861706550617468506F696E74010201060255510331390605706B696E6402010603706F7300401C45000000000080A2C400070F54536861706550617468506F696E74010201060255510332390605706B696E6402010603706F7300401C45000000000080A24400070F54536861706550617468506F696E74010201060255510333390605706B696E6402010603706F7300401CC5000000000080A24400000605636F6C6F724694163FDB8A0D3FB072083F0000803F0603636C6F090603706F7300401CC5000000000080A2C406046364656C0806047069636B0806036E7063080602667705000000000000409C0B40060266680500000000000080A20A4000000006046B6F746C0709544B6F74614C6973740102010602555103343906056B74636E74020001000000070354425001020106025551033539060364697200000080000080BF0000000000000000060275700000008000000080000080BF0000000006047368706C0706545348434F4C0102010602555103363906057368636E74020001000006046B6F746C0709544B6F74614C6973740102010602555103373906056B74636E74020001000000070354425001020106025551033839060364697200000080000080BF000000800000000006027570000080BF00000080000000800000000006047368706C0706545348434F4C0102010602555103393906057368636E74020001000006046B6F746C0709544B6F74614C69737401020106025551033A3906056B74636E740200010000000000"
    )
    .up()
    .end({ prettyPrint: true });

  return xml;
}

// Function to save the XML as a .S3D file
function saveAsS3DFile(xml, fileName) {
  const outputDir = path.join(__dirname, "..", "output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const filePath = path.join(outputDir, `${fileName}.S3D`);
  fs.writeFileSync(filePath, xml, "utf8");
  return filePath;
}

module.exports = { convertExcelToS3D };