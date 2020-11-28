<template>
  <section>
      <b-table
          :data="data"
          :debounce-search="1000"
          :sort-multiple="true"
          :sort-multiple-data="sortingPriority"
          :mobile-cards="false"
      >
        <b-table-column field="reg_qty" label="Reg Qty" width="50" numeric v-slot="props" sortable>
            {{ props.row.reg_qty }}
        </b-table-column>

        <b-table-column field="foil_qty" label="Foil Qty" width="50" numeric v-slot="props" sortable>
            {{ props.row.foil_qty }}
        </b-table-column>

        <b-table-column field="card" label="Card" v-slot="props" searchable sortable>
            {{ props.row.card }}
        </b-table-column>

        <b-table-column field="set" label="Set" v-slot="props" searchable sortable>
            {{ props.row.set }}
        </b-table-column>

        <b-table-column field="rarity" label="Rarity" v-slot="props" searchable sortable>
            {{ props.row.rarity }}
        </b-table-column>

        <b-table-column field="color" label="Color" v-slot="props" searchable sortable>
            {{ props.row.color }}
        </b-table-column>

        <b-table-column field="card_type" label="Card type" v-slot="props" searchable sortable>
            {{ props.row.card_type }}
        </b-table-column>

        <b-table-column field="mana_cost" label="Mana cost" v-slot="props" sortable>
            <div v-html="replaceMana(props.row.mana_cost)"></div>
        </b-table-column>
      </b-table>
  </section>
</template>

<script>

import Papa from 'papaparse'
import fileTemplate from '../assets/cards.csv';

export default {
  name: 'CollectionTable',
  data() {
    return {
      sortingPriority: [
        { field: "set", order: 1 },
        { field: "card", order: 2 },        
      ],
      data: []
    }
  },
  methods: {
    loadTextFromFile() {
      let rows = fileTemplate.split("\n");
      let headers = rows.shift();
      
      headers = headers.replace('Total Qty', 'total_qty');
      headers = headers.replace('Reg Qty', 'reg_qty');
      headers = headers.replace('Foil Qty', 'foil_qty');
      headers = headers.replace('Card', 'card');
      headers = headers.replace('Set', 'set');
      headers = headers.replace('Mana Cost', 'mana_cost');
      headers = headers.replace('Card Type', 'card_type');
      headers = headers.replace('Color', 'color');
      headers = headers.replace('Rarity', 'rarity');
      headers = headers.replace('Mvid', 'mvid');
      headers = headers.replace('Single Price', 'single_price');
      headers = headers.replace('Single Foil Price', 'single_foil_price');
      headers = headers.replace('Total Price', 'total_price');
      headers = headers.replace('Price Source', 'price_source');
      headers = headers.replace('Notes', 'notes');

      rows = rows.map(row => row.replace(/""/g, '&quot;'));

      const csvData = [headers, ...rows].join("\n");

      const json = Papa.parse(csvData, {
        delimiter: ",",
        newline: "\n",
        header: true,
      });

      this.data = json.data;
    },
    replaceMana(mana) {
      if (typeof mana === 'undefined') {
        return mana;
      }

      let costs = mana;
      //{B/G}{
      if (costs.match(/\{([A-Z]{1})\/([A-Z]{1})\}/g)) {
        costs = costs.replace(/\{([A-Z]{1})\/([A-Z]{1})\}/g, '<span class="mtg-color mtg-color--$1$2"></span>');
      } else if (costs.match(/P\}/g)) {
        costs = costs.replace(/\{([A-Z]{1,2})\}/g, '<span class="mtg-color mtg-color--$1"></span>');
      } else {
        costs = costs.replace(/([A-Z]{1})/g, '<span class="mtg-color mtg-color--$1"></span>');
      }

      return costs;
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.loadTextFromFile();
    })
  }
}
</script>

<style lang="css">
  .mtg-color {
    display: inline-block;
    height: 15px;
    position: relative;
    top: 2px;
    width: 15px;
  }
  .mtg-color--B {
    background-image: url('../assets/B.png');
  }
  .mtg-color--BG,
  .mtg-color--GB {
    background-image: url('../assets/BG.png');
  }
  .mtg-color--BP {
    background-image: url('../assets/BP.png');
  }
  .mtg-color--BR,
  .mtg-color--RB {
    background-image: url('../assets/BR.png');
  }
  .mtg-color--C {
    background-image: url('../assets/C.png');
  }
  .mtg-color--G {
    background-image: url('../assets/G.png');
  }
  .mtg-color--GP {
    background-image: url('../assets/GP.png');
  }
  .mtg-color--GU,
  .mtg-color--UG {
    background-image: url('../assets/GU.png');
  }
  .mtg-color--GW,
  .mtg-color--WG {
    background-image: url('../assets/GW.png');
  }
  .mtg-color--P {
    background-image: url('../assets/P.png');
  }
  .mtg-color--R {
    background-image: url('../assets/R.png');
  }
  .mtg-color--RG,
  .mtg-color--GR {
    background-image: url('../assets/RG.png');
  }
  .mtg-color--RP {
    background-image: url('../assets/RP.png');
  }
  .mtg-color--RW,
  .mtg-color--WR {
    background-image: url('../assets/RW.png');
  }
  .mtg-color--U {
    background-image: url('../assets/U.png');
  }
  .mtg-color--UB,
  .mtg-color--BU {
    background-image: url('../assets/UB.png');
  }
  .mtg-color--UP {
    background-image: url('../assets/UP.png');
  }
  .mtg-color--UR,
  .mtg-color--RU {
    background-image: url('../assets/UR.png');
  }
  .mtg-color--W {
    background-image: url('../assets/W.png');
  }
  .mtg-color--WB,
  .mtg-color--BW {
    background-image: url('../assets/WB.png');
  }
  .mtg-color--WP {
    background-image: url('../assets/WP.png');
  }
  .mtg-color--WU,
  .mtg-color--UW {
    background-image: url('../assets/WU.png');
  }
  .mtg-color--X {
    background-image: url('../assets/X.png');
  }
  .mtg-color--S {
    background-image: url('../assets/S.png');
  }
</style>