export interface LoginData{
    nik: string,
    role: string,
    token: string
}

export interface Transaction{
    nik: string,
    fullName: string,
    trxId: string,
    trxDate: Date,
    trxStatus: string,
    survey: boolean,
    customerId: CustomerId
}

export interface Trx{
    trxId: string,
    trxDate: Date,
    nominalCredit: number,
    trxStatus: string,
    customerId: CustomerData
}

export interface CustomerId{
    customerId: string,
    nik: string
}

export interface OccupationType{
    occupationId: string,
    occupation: string
}
export interface CustomerData{
    customerId: string,
    nik: string,
    fullName: string,
    birthPlace: string,
    birthDate: Date,
    gender: string,
    maritalStatus: string,
    religion: string,
    phoneNumber: string,
    address: string,
    rt: string,
    rw: string,
    ward: string,
    district: string,
    city: string,
    province: string,
    officeLocation: string,
    businessPhoto: string,
    postalCode: string,
    occupationType: string,
    supportingDocument: []
}

export interface CustomerSurveyData{
    surveyDataId: string,
    mothersMaidenName: string,
    latestEducationalLevel: string,
    dependents: number,
    email: string,
    bankName: string,
    accountName: string,
    accountNumber: string,
}

export interface SpouseData{
    spouseId: string,
    spouseNik: string,
    spouseName: string,
    spouseBirthdate: string,
    gender: string,
    spouseBirthplace: string,
    spouseMothersMaidenName: string
}

export interface RelativesData{
    relativesId: string,
    relativesName: string,
    relativesRelation: string,
    relativesPhoneNumber: string,
    relativesCellNumber: string,
    relativesAddress: string,
    relativesRt: string,
    relativesRw: string,
    relativesProvince: string,
    relativesDistrict: string,
    relativesCity: string,
    relativesWard: string
}

export interface ProfilingData{
    profileId: boolean,
    breadwinner: boolean,
    literacyAbility: boolean,
    transportationOwner: boolean,
    insuranceOwner: boolean,
    internetAccess: boolean
}

export interface Banks{
    name: string,
    code: string
}

export interface Province{
    id: number,
    name: string
}

export interface City{
    id: string,
    province_id: string,
    name: string
}

export interface District{
    id: string,
    regency_id: string,
    name: string
}

export interface Ward{
    id: string,
    district_id: string,
    name: string
}

export interface AllSurveyReview{
    surveyId: string,
    roleName: string,
    transaction: Trx,
    surveyData: CustomerSurveyData,
    spouse: SpouseData,
    relatives: RelativesData,
    profile: ProfilingData
}


export interface LoanType{
    id: string,
    type: string,
    maxLoan: number
}