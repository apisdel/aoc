export const part1 = (input) => {
    let validPasswords = input
        .split("\n\n")
        .map(n => parsePassport(n))
        .filter(validatePassportAttributes)
        .length;

    return validPasswords;
}

export const part2 = (input) => {
    let validPasswords = input
        .split("\n\n")
        .map(n => parsePassport(n))
        .filter(isPassportValid)
        .length;

    return validPasswords;
}

const parsePassport = (data) => {
    let passport = {};
    let lines = data.split('\n');
    lines.forEach(line => {
        const pairs = line.split(' ');
        pairs.forEach(p => {
            const parts = p.split(':');
            let [k, v] = parts;
            passport[k] = v;
        });
    });
    return passport;
}

const validatePassportAttributes = (passport) => {
    return passport.byr
        && passport.iyr
        && passport.eyr
        && passport.hgt
        && passport.hcl
        && passport.ecl
        && passport.pid;
}

const isPassportValid = (passport) => {
    return validatePassportAttributes(passport)
        && validateYearRange(passport.byr, 1920, 2002)
        && validateYearRange(passport.iyr, 2010, 2020)
        && validateYearRange(passport.eyr, 2020, 2030)
        && validateHeight(passport.hgt)
        && validateRegexp(passport.hcl, '^#[a-z0-9]{6}$')
        && validateRegexp(passport.ecl, '^amb|blu|brn|gry|grn|hzl|oth$')
        && validateRegexp(passport.pid, '^[0-9]{9}$')
}

const validateYearRange = (string, from, to) => {
    const n = parseInt(string);
    return n >= from && n <= to;
}

const validateRegexp = (string, regex) => {
    const regexp = RegExp(regex);
    return regexp.test(string);
}

const validateHeight = (string) => {
    const regexp = RegExp('^([0-9]*)(cm|in)$');
    const matches = string.match(regexp);

    if (!matches || !matches[1] || !matches[2]) {
        return false;
    }

    const height = parseInt(matches[1]);
    const unit = matches[2];

    if (unit === 'cm') {
        return height >= 150 && height <= 193;
    } else if (unit === 'in') {
        return height >= 59 && height <= 76;
    }
    
    return false;
}