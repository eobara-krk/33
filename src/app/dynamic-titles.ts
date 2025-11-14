// dynamic-titles.ts

export class DynamicTitles {
  static getDedicationDayTitle(startDate: Date): string {
    if (startDate.getMonth() === 2 && startDate.getDate() === 22) {
      return 'Dzień oddania <br><i><b>03 V</b></i>';
    }
    return 'Dzień oddania <br><i><b>08 XII</b></i>';
  }

  static getThirdWeekTitle(startDate: Date): string {
    if (startDate.getMonth() === 2 && startDate.getDate() === 22) {
      return 'Tydzień trzeci - Poznanie Jezusa Chrystusa <br><i><b>26 IV - 02 V</b></i>';
    }
    return 'Tydzień trzeci - Poznanie Jezusa Chrystusa <br><i><b>01 XII - 07 XII</b></i>';
  }

  static getSecondWeekTitle(startDate: Date): string {
    if (startDate.getMonth() === 2 && startDate.getDate() === 22) {
      return 'Tydzień drugi - Poznanie Najświętszej Maryi Panny <br><i><b>19 IV - 25 IV</b></i>';
    }
    return 'Tydzień drugi - Poznanie Najświętszej Maryi Panny <br><i><b>24 XI - 30 XI</b></i>';
  }

  static getFirstWeekTitle(startDate: Date): string {
    if (startDate.getMonth() === 2 && startDate.getDate() === 22) {
      return 'Tydzień pierwszy - Poznanie samego siebie <br><i><b>12 IV - 18 IV</b></i>';
    }
    return 'Tydzień pierwszy - Poznanie samego siebie <br><i><b>17 XI - 23 XI</b></i>';
  }

  static getTwelveDaysTitle(startDate: Date): string {
    if (startDate.getMonth() === 2 && startDate.getDate() === 22) {
      return 'Wyzbycie się ducha tego świata 12 dni <br><i><b>31 III - 11 IV</b></i>';
    }
    return 'Wyzbycie się ducha tego świata 12 dni <br><i><b>05 XI - 16 XI</b></i>';
  }

  static getNovenaTitle(startDate: Date): string {
    if (startDate.getMonth() === 2 && startDate.getDate() === 22) {
      return 'Nowenna do św. Ludwika <br><i><b>22 III - 30 III</b>';
    }
    return 'Nowenna do św. Ludwika <br><i><b>27 X - 04 XI</b></i>';
  }
}
