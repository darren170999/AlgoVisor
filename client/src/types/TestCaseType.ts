export type TestCaseType = {
    id:string;
    qnid:string;
    testcases: {
        input: string;
        output: string;
    }[];
    hiddentestcases: {
        input: string;
        output: string;
    }[];
  };