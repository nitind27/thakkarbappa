export const isAlphaWithSpaces = (value: string): boolean => {
    // Allowing alphabetic characters from Latin and Devanagari scripts, including spaces
    return /^[A-Za-zÀ-ÿ\u0900-\u097F\s]+$/.test(value);
};

export const validateClusterName = (name: string): string | null => {
    if (!name) {
        return "Cluster name is required.";
    }
    if (!isAlphaWithSpaces(name)) {
        return "Cluster name must contain only alphabetic characters and spaces.";
    }
    return null; // No errors
};


export const validateTalukaName = (name: string): string | null => {
    if (!name) {
        return "Taluka  name is required.";
    }
    if (!isAlphaWithSpaces(name)) {
        return "Taluka  name must contain only alphabetic characters and spaces.";
    }
    return null; // No errors
};



// Function to check if a value is numeric
export const isNumeric = (value: string): boolean => {
    return /^\d+$/.test(value);
};

// Updated validation functions
export const validateTownName = (name: string): string | null => {
    if (!name) {
        return "Town name is required.";
    }
    if (!isAlphaWithSpaces(name)) {
        return "Town name must contain only alphabetic characters and spaces.";
    }
    return null; // No errors
};

export const validateNameMarathi = (name: string): string | null => {
    if (!name) {
        return "Name in Marathi is required.";
    }
    if (!isAlphaWithSpaces(name)) {
        return "Name in Marathi must contain only alphabetic characters and spaces.";
    }
    return null; // No errors
};

export const validateTalukaId = (talukaId: string): string | null => {
    if (!talukaId) {
        return "Taluka ID is required.";
    }
    // Assuming talukaId is selected from a dropdown, you may want to check if it's a valid ID
    return null; // No errors
};

export const validatePopulation = (population: string): string | null => {
    if (!population) {
        return "Population is required.";
    }
    if (!isNumeric(population)) {
        return "Population must be a number.";
    }
    return null; // No errors
};

// Main validation function
export const validateFormgrampanchayat = (townName: string, nameMarathi: string, talukaId: string, population: string): string[] => {
    const errors: string[] = [];

    const townNameError = validateTownName(townName);
    if (townNameError) errors.push(townNameError);

    const nameMarathiError = validateNameMarathi(nameMarathi);
    if (nameMarathiError) errors.push(nameMarathiError);

    const talukaIdError = validateTalukaId(talukaId);
    if (talukaIdError) errors.push(talukaIdError);

    const populationError = validatePopulation(population);
    if (populationError) errors.push(populationError);

    return errors; // Returns an array of error messages
};

// Usage example





// Validation function for the Masul Gaav form
export const validateMasulGaav = (
    townName: string,
    nameMarathi: string,
    talukaId: string,
    population: string,
    triblePopulation: string,
    arthikMaryada: string,
    villageType: string
): string[] => {
    const errors: string[] = [];

    // Check required fields
    if (!townName) {
        errors.push("Grampanchayat name is required.");
    }
    if (!nameMarathi) {
        errors.push("Mahsul Gaav is required.");
    }
    if (!talukaId) {
        errors.push("Select Taluka is required.");
    }
    if (!population) {
        errors.push("Total Population is required.");
    } else if (!isNumeric(population)) {
        errors.push("Total Population must be a number.");
    }
    if (!triblePopulation) {
        errors.push("Trible Population is required.");
    } else if (!isNumeric(triblePopulation)) {
        errors.push("Trible Population must be a number.");
    }
    if (!arthikMaryada) {
        errors.push("Arthik Maryada is required.");
    }
    if (!villageType) {
        errors.push("Village Type is required.");
    }

    return errors; // Return an array of error messages
};






// Types for the school form validation parameters
type SchoolFormValidationParams = {
    schoolName: string;
    address: string;
    clusterId: string;
    talukaId: string;
    udias: string;
    stds: string;
    medium: string;
    emailId: string;
    mukhyaName: string;
    mukhyaContact: string;
    mukhyaEmail: string;
    purushName: string;
    purushContact: string;
    purushEmail: string;
    striName: string;
    striContact: string;
    striEmail: string;
    schoolNameMr: string;
};

// Validation function for the school form
export const validateSchoolForm = ({
    schoolName,
    address,
    clusterId,
    talukaId,
    udias,
    stds,
    medium,
    emailId,
    mukhyaName,
    mukhyaContact,
    mukhyaEmail,
    purushName,
    purushContact,
    purushEmail,
    striName,
    striContact,
    striEmail,
    schoolNameMr,
}: SchoolFormValidationParams): string[] => {
    const errors: string[] = [];

    // Required field validation for text inputs
    const requiredTextFields = [
        { value: schoolName, name: "School Name" },
        { value: address, name: "Address" },
        { value: udias, name: "UDIAS" },
        { value: stds, name: "STDS" },
        { value: emailId, name: "Email ID" },
        { value: mukhyaName, name: "Mukhya Name" },
        { value: mukhyaContact, name: "Mukhya Contact" },
        { value: mukhyaEmail, name: "Mukhya Email" },
        { value: purushName, name: "Purush Name" },
        { value: purushContact, name: "Purush Contact" },
        { value: purushEmail, name: "Purush Email" },
        { value: striName, name: "Stri Name" },
        { value: striContact, name: "Stri Contact" },
        { value: striEmail, name: "Stri Email" },
        { value: schoolNameMr, name: "School Name (MR)" },
    ];

    requiredTextFields.forEach(field => {
        if (!field.value) {
            errors.push(`${field.name} is required.`);
        }
    });

    // Required field validation for select inputs
    const requiredSelectFields = [
        { value: clusterId, name: "Cluster ID" },
        { value: talukaId, name: "Taluka ID" },
        { value: medium, name: "Medium" },
    ];

    requiredSelectFields.forEach(field => {
        if (!field.value) {
            errors.push(`${field.name} is required.`);
        }
    });

    // UDIAS should be a maximum of 11 digits
    if (udias && udias.length > 11) {
        errors.push("UDIAS must not exceed 11 digits.");
    }

    // Validate striEmail format
    if (striEmail && !/\S+@\S+\.\S+/.test(striEmail)) {
        errors.push("Stri Email must be a valid email format.");
    }

    // Validate contact formats (10 digits)
    const validateContact = (contact: string, name: string) => {
        if (contact && !/^\d{10}$/.test(contact)) {
            errors.push(`${name} must be a 10-digit number.`);
        }
    };

    // validateContact(striContact, "Stri Contact");
    // validateContact(mukhyaContact, "Mukhya Contact");
    // validateContact(purushContact, "Purush Contact");

    return errors; // Returns an array of error messages
};











