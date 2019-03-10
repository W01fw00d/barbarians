//TODO move this into literals/
function UnitNames() {}

UnitNames.prototype.romanSoldierNames = [
    'Nerón', 'Victis', 'Caesar', 'Platón', 'Sócrates', 'Aristóteles', 'Augusto', 'Aquiles', 'Ulises', 'Agamenón', 'Arkantos', 'Ajax',
    'Homero', 'Dante', 'Zeus', 'Helena', 'Apollo', 'Atenea', 'Minerva', 'Fausto', 'Hades', 'Poseidón', 'Júpiter', 'Venus', 'Mercurio',
    'Galileo', 'Vinci', 'Invictus', 'Titán', 'Atlas', 'Gea', 'Gaia', 'Saturno', 'Urano', 'Dionisio', 'Ares', 'Kratos',
    'Gaius', 'Lucius', 'Marcus', 'Publius', , 'Quintus', 'Quinta', 'Tidus', 'Tiberius', 'Aulus', 'Spurius', 'Manius', 'Servius', 'Appius', 'Vibius',
    'Agrippa', 'Aquilinius', 'Balbus', 'Barbatus', 'Cicerón', 'Cilo', 'Corvus', 'Corpus', 'Lapidus', 'Mergus', 'Regulus', 'Scipio', 'Severus', 'Triarius', 'Aureus',
    'Auron', 'Yuna', 'Riku', 'Niku', 'Wolfwood', 'Nicholas', 'Cibeles',
    'Aura', 'Austro', 'Asclepio', 'Baco', 'Cupido', 'Legolas', 'Aragorn', 'Diana', 'Libertas', 'Laverna', 'Liber',
    'Fornax', 'Eón', 'Fauno', 'Osiris', 'Nemauso', 'Egestas', 'Tellus', 'Timor', 'Quirino', 'Proserpina', 'Pax',
    'Vesta', 'Virtus', 'Volumna', 'Vulturno', 'Europa', 'Pandora', 'Efreet', 'Nova', 'Artemis', 'Bahamut', 'Deux Ex', 'Oraculo', 'El Gran Héroe', 'Rey de los Judios',
    'Einstein', 'Madara', 'Mandala', 'Rem', 'Alejandro', 'Django', 'Shiva', 'Ánima',
    'Gabo', 'Jordi','Juanju', 'Iván', 'Marga', 'Nacho',

    'Nerón', 'Victis', 'Caesar', 'Platón', 'Sócrates', 'Aristóteles', 'Augusto', 'Aquiles', 'Ulises', 'Agamenón', 'Arkantos', 'Ajax',
    'Homero', 'Dante', 'Zeus', 'Helena', 'Apollo', 'Atenea', 'Minerva', 'Fausto', 'Hades', 'Poseidón', 'Júpiter', 'Venus', 'Mercurio',
    'Galileo', 'Vinci', 'Invictus', 'Titán', 'Atlas', 'Gea', 'Gaia', 'Saturno', 'Urano', 'Dionisio', 'Ares', 'Kratos',
    'Gaius', 'Lucius', 'Marcus', 'Publius', , 'Quintus', 'Quinta', 'Tidus', 'Tiberius', 'Aulus', 'Spurius', 'Manius', 'Servius', 'Appius', 'Vibius',
    'Agrippa', 'Aquilinius', 'Balbus', 'Barbatus', 'Cicerón', 'Cilo', 'Corvus', 'Corpus', 'Lapidus', 'Mergus', 'Regulus', 'Scipio', 'Severus', 'Triarius', 'Aureus',
    'Auron', 'Yuna', 'Riku', 'Niku', 'Wolfwood', 'Nicholas', 'Cibeles',
    'Aura', 'Austro', 'Asclepio', 'Baco', 'Cupido', 'Legolas', 'Aragorn', 'Diana', 'Libertas', 'Laverna', 'Liber',
    'Fornax', 'Eón', 'Fauno', 'Osiris', 'Nemauso', 'Egestas', 'Tellus', 'Timor', 'Quirino', 'Proserpina', 'Pax',
    'Vesta', 'Virtus', 'Volumna', 'Vulturno', 'Europa', 'Pandora', 'Efreet', 'Nova', 'Artemis', 'Bahamut', 'Deux Ex', 'Oraculo', 'El Gran Héroe', 'Rey de los Judios',
    'Einstein', 'Madara', 'Mandala', 'Rem', 'Alejandro', 'Django', 'Shiva', 'Ánima',
    'Gabo', 'Jordi','Juanju', 'Iván', 'Marga', 'Nacho'
];

UnitNames.prototype.barbarianSoldierNames = [
    'El Decapitador', 'El DejaViudas', 'El Psicópata', 'Perro Loco', 'Jacobo PechoLobo', 'Champ', 'Chemp', 'Chomp', 'El SajaPerros', 'El ViolaCabras', 'Oso Sin Pelo',
    'Verganmitorix', 'Harrak el Desmembrador', 'Conan el Bárbaro', 'Thormund', 'Jormungard', 'Fenrir', 'Gullinbursti', 'Bruto', 'CabezaYunke', 'Empalador', 'Bárbara',
    'Zaratustra', 'CaraCulo', 'Calavera', 'Cráneo', 'Apestoso', 'Max', 'Stomp', 'Stamp', 'CuernoRoto', 'Ano', 'Ulf', 'Udolf', 'Alf', 'Olf', 'HachaGrande', 'LanzaRota',
    'MataReyes', 'Destructor', 'Abrasador', 'Ensartador', 'Arpía', 'El Gordo', 'BarrilViejo', 'Melody',
    'Ásterix', 'Obelix', 'Abraracourcix', 'Homeopatix', 'Amerix', 'Amnesix', 'Eponine', 'Odalix', 'Vascongalo', 'Alambix',
    'Panoramix', 'Karabella', 'Ideafix', 'Franco', 'Anglo', 'Sajón', 'Lombardo', 'CabezaHuevo',
    'Alberick', 'Alrik', 'Algot', 'Asmund', 'Gunvor', 'Grevor', 'Hallmar', 'Humla', 'Inge', 'Ingo', 'Ingred', 'Maj',
    'Lunt', 'Leif', 'Majken', 'Lynae', 'Rin', 'Vidhr', 'Ylwa', 'Ursa', 'Yorick', 'Winka', 'Wanka', 'Trygg', 'Masturbatix',
    'Tove', 'Torborg', 'Thour', 'Thurston', 'Valkyrie', 'Alina', 'Dash La Estampida', 'Trin La Tormenta', 'Odín', 'El Segador', 'Thor', 'Leviatán', 'Brunilda',

    'El Decapitador', 'El DejaViudas', 'El Psicópata', 'Perro Loco', 'Jacobo PechoLobo', 'Champ', 'Chemp', 'Chomp', 'El SajaPerros', 'El ViolaCabras', 'Oso Sin Pelo',
    'Verganmitorix', 'Harrak el Desmembrador', 'Conan el Bárbaro', 'Thormund', 'Jormungard', 'Fenrir', 'Gullinbursti', 'Bruto', 'CabezaYunke', 'Empalador', 'Bárbara',
    'Zaratustra', 'CaraCulo', 'Calavera', 'Cráneo', 'Apestoso', 'Max', 'Stomp', 'Stamp', 'CuernoRoto', 'Ano', 'Ulf', 'Udolf', 'Alf', 'Olf', 'HachaGrande', 'LanzaRota',
    'MataReyes', 'Destructor', 'Abrasador', 'Ensartador', 'Arpía', 'El Gordo', 'BarrilViejo', 'Melody',
    'Ásterix', 'Obelix', 'Abraracourcix', 'Homeopatix', 'Amerix', 'Amnesix', 'Eponine', 'Odalix', 'Vascongalo', 'Alambix',
    'Panoramix', 'Karabella', 'Ideafix', 'Franco', 'Anglo', 'Sajón', 'Lombardo', 'CabezaHuevo',
    'Alberick', 'Alrik', 'Algot', 'Asmund', 'Gunvor', 'Grevor', 'Hallmar', 'Humla', 'Inge', 'Ingo', 'Ingred', 'Maj',
    'Lunt', 'Leif', 'Majken', 'Lynae', 'Rin', 'Vidhr', 'Ylwa', 'Ursa', 'Yorick', 'Winka', 'Wanka', 'Trygg', 'Masturbatix',
    'Tove', 'Torborg', 'Thour', 'Thurston', 'Valkyrie', 'Alina', 'Dash La Estampida', 'Trin La Tormenta', 'Odín', 'El Segador', 'Thor', 'Leviatán', 'Brunilda',
];

UnitNames.prototype.romanTownNames = [
    'Roma', 'Polentia', 'Tracia', 'Hispalis', 'Gades', 'Atenas', 'Tiberia', 'Publia',
    'Londinium', 'Agrippina', 'Burgidala', 'Salmantica', 'Tarraco', 'Babel', 'Tingis', 'Tomis', 'Salona', 'Naissus', 'Ancyra', 'Artaxarta',
    'Caesarea', 'Nisibis', 'Tarsus', 'Salamis', 'Bostra', 'Cyrene', 'Alexandria',
    'Zanarkand', 'Ciudad de Paso',
    'Palma', 'Buenos Aires', 'Sa Cabaneta', 'Son Ferriol', 'Banyalbufar', 'Manacor', 'Corrubedo'
];

UnitNames.prototype.barbarianTownNames = [
    'Tótems', 'VillaLobos', 'Aldea de la Peste', 'Tambor de Piel', 'Campamento de Caza', 'Guarida de Incursores', 'Jotunheim', 'Iggdrassil',
    'Galia', 'Ostrogodia', 'Cartago', 'Aldea de los Hunos', 'Aldea de los Godos', 'Campamento Franco', 'Pueblo Sajón', 'Tierras de Vándalos',
    'Campamento de Ostrogodos', 'Tungri', 'Treveri', 'Marsi', 'Camavi', 'Frisonia', 'Usupeti', 'Cherusci', 'Sicambrii', 'Catii', 'Suebi', 'Turones',
    'Angli', 'Varni', 'Angrivarii', 'Cauces', 'Saxones', 'Sexonia', 'Lemovii', 'Rugii', 'Gothi', 'Vandali', 'Bastarni',
    'Burgundii', 'Buri', 'Quadi',
    'Pueblo Paleto', 'Son Banya', 'Gotham', 'Son Gotleu', 'Son Roca'
];
