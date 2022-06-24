 export interface IChallenge {
  /** ID Unique */
  idChallenge: number;
  /** Nom de famille */
  labelChallenge?: string;
  /** Prénom */
  startDateChallenge?: Date;
  /** Adress e-mail, ceci doit être unique est sera utilisé comme identifiant pour l'utilisateur */
  endDateChallenge: Date;
}

export type IChallengeCreate = Omit<IChallenge, 'idChallenge'>;
export type IChallengeUpdate = Partial<IChallengeCreate>;
export type IChallengeRO = Readonly<IChallenge>;