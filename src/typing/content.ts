import { Url } from "url"


// https://californiaucp.dbesystem.com/ <-- LGBT buiness

export enum BusinessEntityType {
    BCorporation = "B Corporation",
    CCorporation = "C Corporation",
    Corporation = "Corporation",
    Franchise = "Franchise",
    Government = "Government",
    JointVenture = "Joint Venture",
    LimitedJointVenture = "Limited Joint Venture",
    LLC = "LLC",
    LLP = "LLP",
    NonProfit = "Non-Profit",
    Partnership = "Partnership",
    PC = "PC",
    PLLC = "PLLC",
    RLLP = "RLLP",
    SCorporation = "S Corporation",
    SoleProprietorship = "Sole Proprietorship",
    Unknown = "Unknown"
}

export enum Ethnicity {
    Asian = "Asian",
    AsianIndian = "Asian Indian",
    AsianPacific = "Asian Pacific",
    Black = "Black",
    Caucasian = "Caucasian",
    HispanicLatino = "Hispanic/Latino",
    NativeAmerican = "Native American",
    Other = "Other"
}
export enum Gender {
    Male = "Male",
    Female = "Female",
    Other = "Other"
}

class EmailAddress {
    domain: string
    user: string

    constructor(user: string, domain: string) {
        this.domain = domain
        this.user = user
    }

    getEmailString(): string {
        return this.user.concat(this.domain)
    }
}
export enum USState {
    AL = "Alabama",
    AK = "Alaska",
    AZ = "Arizona",
    AR = "Arkansas",
    CA = "California",
    CO = "Colorado",
    CT = "Connecticut",
    DE = "Delaware",
    FL = "Florida",
    GA = "Georgia",
    HI = "Hawaii",
    ID = "Idaho",
    IL = "Illinois",
    IN = "Indiana",
    IA = "Iowa",
    KS = "Kansas",
    KY = "Kentucky",
    LA = "Louisiana",
    ME = "Maine",
    MD = "Maryland",
    MA = "Massachusetts",
    MI = "Michigan",
    MN = "Minnesota",
    MS = "Mississippi",
    MO = "Missouri",
    MT = "Montana",
    NE = "Nebraska",
    NV = "Nevada",
    NH = "New Hampshire",
    NJ = "New Jersey",
    NM = "New Mexico",
    NY = "New York",
    NC = "North Carolina",
    ND = "North Dakota",
    OH = "Ohio",
    OK = "Oklahoma",
    OR = "Oregon",
    PA = "Pennsylvania",
    RI = "Rhode Island",
    SC = "South Carolina",
    SD = "South Dakota",
    TN = "Tennessee",
    TX = "Texas",
    UT = "Utah",
    VT = "Vermont",
    VA = "Virginia",
    WA = "Washington",
    WV = "West Virginia",
    WI = "Wisconsin",
    WY = "Wyoming"
}
class Contact {
    nameFirst: string
    nameLast: string
    email: EmailAddress
    phone: string
    fax: string

    title?: string

    constructor(nameFirst: string, nameLast: string, email: EmailAddress, phone: string, fax: string) {
        this.nameFirst = nameFirst
        this.nameLast = nameLast
        this.email = email
        this.phone = phone
        this.fax = fax
    }
}

export class BuisnessDataModel {
    name: string
    DBAName: string
    operationType: BusinessEntityType
    taxNumber: string
    ethnicity: Ethnicity
    gender: Gender
    email: EmailAddress
    phone: string
    fax?: string
    website?: Url
    address: string[3]

    state: USState
    zip: string

    constructor(
        name: string,
        DBAName: string,
        operationType: BusinessEntityType,
        taxNumber: string,
        ethnicity: Ethnicity,
        gender: Gender,
        email: EmailAddress,
        phone: string,
        address: string[3],
        state: USState,
        zip: string,
        fax?: string,
        website?: Url
    ) {
        this.name = name
        this.DBAName = DBAName
        this.operationType = operationType
        this.taxNumber = taxNumber
        this.ethnicity = ethnicity
        this.gender = gender
        this.email = email
        this.phone = phone
        this.fax = fax
        this.website = website
        this.address = address
        this.state = state
        this.zip = zip
    }
}