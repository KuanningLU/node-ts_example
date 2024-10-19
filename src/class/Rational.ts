/**
 * 請參考 human.ts 的語法完成 Rational 類
 */

// Rational.ts
// Rational.ts
export class Rational {
    constructor(
        public numerator: number,   // 分子
        public denominator: number   // 分母
    ) {}

    getNumerator(): number {
        return this.numerator;
    }

    getDenominator(): number {
        return this.denominator;
    }

    normalize(): Rational {
        const gcd = this.greatestCommonDivisor(this.numerator, this.denominator);
        const newNumerator = this.numerator / gcd;
        const newDenominator = this.denominator / gcd;

        return new Rational(newNumerator, newDenominator > 0 ? newDenominator : -newDenominator);
    }

    isWhole(): boolean {
        return this.denominator !== 0 && this.numerator % this.denominator === 0;
    }

    isDecimal(): boolean {
        return !this.isWhole();
    }

    private _equals(numerator: number, denominator: number): boolean {
        const normalizedThis = this.normalize();
        const rationalToCompare = new Rational(numerator, denominator).normalize();
        return normalizedThis.getNumerator() === rationalToCompare.getNumerator() &&
               normalizedThis.getDenominator() === rationalToCompare.getDenominator();
    }

    equals(r: Rational): boolean {
        const normalizedThis = this.normalize();
        const normalizedR = r.normalize();
        return normalizedThis.getNumerator() === normalizedR.getNumerator() &&
               normalizedThis.getDenominator() === normalizedR.getDenominator();
    }

    static _parseRational(char1: string[], char2: string[]): Rational {
        const numerator = parseInt(char1.join(''));
        const denominator = parseInt(char2.join(''));

        if (isNaN(numerator) || isNaN(denominator)) {
            throw new Error("Invalid input. Unable to parse from input arrays.");
        }
        return new Rational(numerator, denominator);
    }

    static parseRational(str: string): Rational {
        const parts = str.split('/');

        if (parts.length !== 2) {
            throw new Error("Input string must be in the form 'numerator/denominator'.");
        }
        const numerator = parseInt(parts[0].trim());
        const denominator = parseInt(parts[1].trim());

        return new Rational(numerator, denominator);
    }

    toString(): string {
        return `${this.numerator}/${this.denominator}`;
    }

    private greatestCommonDivisor(a: number, b: number): number {
        return b === 0 ? Math.abs(a) : this.greatestCommonDivisor(b, a % b);
    }
}
