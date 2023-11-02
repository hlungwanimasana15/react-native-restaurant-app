import React, { useState } from 'react';
import { View, Text, CheckBox } from 'react-native';

const Extras = () => {


  const [selectedExtras, setSelectedExtras] = useState({
    chips: false,
    dips: false,
    drinks: false,
  });

  const toggleExtra = (extraType) => {
    setSelectedExtras({
      ...selectedExtras,
      [extraType]: !selectedExtras[extraType],
    });
  };

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Extras</Text>
      <View>
        <CheckBox
          value={selectedExtras.chips}
          onValueChange={() => toggleExtra('chips')}
        />
        <Text>Chips</Text>
      </View>
      <View>
        <CheckBox
          value={selectedExtras.dips}
          onValueChange={() => toggleExtra('dips')}
        />
        <Text>Dips</Text>
      </View>
      <View>
        <CheckBox
          value={selectedExtras.drinks}
          onValueChange={() => toggleExtra('drinks')}
        />
        <Text>Drinks</Text>
      </View>
      <View>
        <Text style={{ fontSize: 16, marginTop: 10 }}>Selected Extras:</Text>
        {/* {Object.entries(selectedExtras).map(([extraType, selected]) => (
          selected && <Text key={extraType}>{extraType}</Text>
        )} */}
      </View>
    </View>
  );
};

export default Extras;
