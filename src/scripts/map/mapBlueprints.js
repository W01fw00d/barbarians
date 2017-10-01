/*
MAP CREATOR ICON ANNOTATION

Obstacles:
x = lonely mountain
I = start (Left) of horizontal mountain range
X = mountain range center
D = end (Right) of horizontal mountain range
V = vegetation

' ' = empty cell

Units:
N = neutral town
A = roman town
E = barbarian town
n = neutral creature (wolfs)
a = roman soldier
e = barbarian soldier


OTHERS (NOT IMPLEMENTED YET)

'-' = road
'S' = river
'=' = bridge
'[' = wall

*/

//maps 8x8 (64 cells), 10 maps y 1 template
const blueprints = [
    [
        "        ",
        "        ",
        "        ",
        "        ",
        "        ",
        "        ",
        "        ",
        "        "
    ],

    [
        "ID n  ID",
        "xA    Nx",
        "x     ID",
        "  aID   ",
        "    xe  ",
        "ID     x",
        "xN    Ex",
        "IXD  nID"
    ],

    [
        "ID IXXXD",
        "x IXXD x",
        "ID AN ID",
        "ID a aID",
        "IDe e ID",
        "ID eE ID",
        "xE ID  x",
        "IXXXDeID"
    ],

    [
        "IXD IXXD",
        "xaaaaaax",
        "x      x",
        "x      x",
        "x   N  x",
        "xe E  ex",
        "x ee e x",
        "IXXDeIXD"
    ],

    [
        "ID IXXXD",
        "xAa    x",
        "IXXXDN x",
        "xNn    x",
        "x    nNx",
        "x EIXXXD",
        "x     Ex",
        "IXXXXXXD"
    ],

    [
        "xeee VID",
        "V e e eV",
        " e    e ",
        " V AA  n",
        "   aa   ",
        " e    e ",
        " ee  e n",
        "n Ve eeV"
    ],

    [
        "IXXXXXXD",
        "x E V   ",
        "x  eV Ax",
        "x E N ax",
        "x  e  ax",
        "x E V Ax",
        "x e V   ",
        "IXXXXXXD"
    ],

    [
        "V     AV",
        "  VE   V",
        "       n",
        "n n   V ",
        " nVVVNnn",
        "       n",
        "N a     ",
        "VVV VE V"
    ],

    [
        "IXDN IXD",
        "ID   e x",
        "x  A  Ex",
        "xaIXD ID",
        "x x   Ex",
        "x x N  x",
        "xe ex Ex",
        "IDNIXXXD"
    ],

    [
        "V  a   n",
        " N   nV ",
        "    nNn ",
        "VVVV    ",
        "  n eeE ",
        "x   E e ",
        "IDn eeE ",
        "IXD    V"
    ],

    [
        "IXXXXXDn",
        "xe EEVID",
        "x e ee x",
        "nVe   ee",
        "V      V",
        "aaaaaaaa",
        "a  aa  a",
        "aaaaaaaa"
    ]
];