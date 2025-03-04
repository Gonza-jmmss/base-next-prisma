import getQuarterNotesByStudentId from "@/repositories/reports/queries/getQuarterNotesByStudentId";
import IFLEStudentNotesPDF from "@/components/reports/ifleStudentNotes/ifleStudentNotesPDF";
import IFLEStudentNotesAmericanPDF from "@/components/reports/ifleStudentNotes/ifleStudentNotesAmericanPDF";
import { TabsComponent } from "@/components/common/tabs";
import FrenchTranscript from "@/components/reports/ifleStudentNotes/frenchTranscript";
import AmericanTranscript from "@/components/reports/ifleStudentNotes/americanTranscript";
import frFR from "@/lang/fr-FR";

export default async function ifleStudentsNotesPage({
  params,
}: {
  params: { id: string };
}) {
  const t = frFR;

  const studentNotes = await getQuarterNotesByStudentId(parseInt(params.id));
  // const studentNotes = await studentNotesQuery.execute(parseInt(params.id));

  const tabs = [
    {
      id: "frenchTranscript",
      title: "Français",
      body: <FrenchTranscript studentNotesData={studentNotes} />,
    },
    {
      id: "americanTranscript",
      title: "Américain",
      body: <AmericanTranscript studentNotesData={studentNotes} />,
    },
  ];

  return (
    <main className="mt-5 flex justify-center">
      <div className="mt-3 w-[80vw]">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-semibold">{`${t.reports.ifleStudentsNotes.titlePage} : `}</span>
            <span className="text-xl">{`${studentNotes.StudentLastName}, ${studentNotes.StudentFirstName}`}</span>
          </div>
          <div className="flex space-x-3">
            <IFLEStudentNotesPDF studentNotesData={studentNotes} />
            <IFLEStudentNotesAmericanPDF studentNotesData={studentNotes} />
          </div>
        </div>
        <TabsComponent
          tabs={tabs}
          className="mt-5 w-full"
          tabListClassName="w-[30rem]"
        />
        {/* <pre>{JSON.stringify(studentNotes.CourseNotes, null, 2)}</pre> */}
      </div>
    </main>
  );
}
