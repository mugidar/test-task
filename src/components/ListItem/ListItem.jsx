import React, { useEffect, useRef, useState } from "react";
import useHover from "../../hooks/useHover";
import EditableText from "../EditableText/EditableText";
import MyCheckbox from "../MyCheckbox/MyCheckbox";
import styles from "./ListItem.module.scss";
import kyivstar from "../../assets/icons/kyivstar.png";
import fua from "../../assets/icons/Fua.png";
import MyModal from "../UI/MyModal/MyModal";

const companies = [
  {
    name: "Kyivstar",
    imgSrc:
      "https://lh3.googleusercontent.com/fife/AMPSemdpLADSm5js2bhyoXsfaFf4DKXUCKKm-20y-WR1sFqFrUrjN5zVKBdjNrbMAospVCdU3UryghtHJtlFWMx5HyH24kzDz0-mVBz3iNuBIOEowendZIO5Es2ihnKPEYwZdg35CqFg5j9JX_jNHCzjRA6I22AZZth6DGdtHyMUL1nAL9FelSuBMklJIfKIrN_0L6xHcbpueZTN7PJKpc3KPiL7fUU-_MQa6LHMw-wZCDjXkReRvxLPRkO2er7wrLljvTyrGSb4NXmzwNgjyw0UBjdMbw4E1EgfY3oTqvk9n79D7VU1T0B3qAPn15jlrbmjglwybeK7wuGV1oBcrB3di_2T77eQjKo8iLGrvjAbo9dZQzct4wIJz2EcDQyM4vBNU10u25dfNy_1qUMevgzW1CDuV270TKTtuubD2xU72dpQa2dcxZOb8epVc0YKWlkT4JxcKyI_ofjr9Oi21xIYtN_El9eDnzD12yqh7axBjpU6qs7y9t3L0-3IadbuS0J_V8WGouZy7PGaIYUUg0ZWMz5IWBmXL6RMVmZ1Cu4iacJ4z7_NUBYXr-psFB16iFo3xAdY_-eAc39spBOGaxSYLQaJ4w1GgLjsukALx0DF3HlDeKnAN_LfzHqf2ro3aiCjoccfOFmL_ASS7jXMHN94G-B3JV40F2HKcCv-P0lGw6-hG8KLODaW4yHrk48YzmJE3aS_sVbiOdWzk1QGjBDmSaGXs4hvXn8SwayO-FI9hglddZpI2U6jexwZmtAMAe8d60aMo5CDFGAeZ3qCIADTqyJMxIcBfIV0DNgKwC6gY9Ra9nxE0QNH9YdzO0PKi49KxpYT-gBsvVASWtTdLDIWyzvy3T-CInPpfe52vtKkeqkpTvBJLmzG8DGMXzZgBL1PCd85LQigfKzIyjHR2FxXfjhAaySrcD6loECQdBcd6E6XnxbAEo67g4nKgudRSuM1d-aIr7g7X58GVtZpVbP3R1hMeekeR3voaFn_GmDUz5jghIJTPZmaWv3KXBRCJYHKn7tpQDvmGQdyzPFMoNMUH8E1EqK3KfdhRfKVyn0IYeOcI9J5knkIKrmX6s0UJpxKBDbrBu15PErKf4oUCsz8Q2Xu8pwLo5HOqIygz0jKu2_8u_zmgRpr-A_vKWWbX59u1n-XT2lnUjPCxDPzl5q0qQFFAZkzUyqf5lWqPE1ufdk0ef9GTYQlWusshUgaX6cAsfukwZL-EvEi--0frCT0Qi_pmnWxqBP7qY_l01SjedZCWLNQNC7NwKCgxGF9Cau9otU4zAfDvRYZwb1XcZ6CJ12xSkr3glO58t2-nEzf7x5mGR_geX8w7TnkiBIma63AKNGk_unAeJ7sJdUcTyKoC2kG68FbLPYtagkA-bXfaVs2rqfS6oPjufQoEnypB8ZhKDz_pcXPeCPNa12r6zn7nYD_c2Qx-mByyVbNeXdvT8ps__m4PwlwV5Z4_gIDwZSg-PDjYOeiLdiQh2sZemylTMN-rnPyPkzInfHkwGisGrQdnxgFIPT1JOX_BM7B97Nd2MrR5QJZ_6314128cEOK990dQhsrULfr_UsSHmhl1Onn_PIdlMBbO4veFLbcWenvDAUvg6N45GZBegCz0EiHpAdZY7XpMUd0Xd6We01f7-ug-mTZsh6b9mfUIdQ=w1491-h969"
  },
  {
    name: "FUa",
    imgSrc:
      "https://lh3.googleusercontent.com/fife/AMPSemdFgQjvONlq0RYFxA2XmT0WHueDsLw4beuVPQNSPwk8vTVbqeEfYgudE6p4Nm9LcFwro7ALZwNiY3qMXdZaoSZwunHStMws3zulyZe3U79TGbgU0d7Q25MfTeepUKoRQx7Le6WYlxe8ZVny6xMgZWuUKqPpuTmmABJYI7sJJ-oq_h_F1luOLEGvwI9qp984s6TeU5ABk_tnjXG2XRTp_iFqDwstv1np7gXkaK5O4lH79wNMe96WHEMcDTSuLkMeAP69y_V5uA1Nz__MUOxccM6-Z20cX97pIm85-BQpdz_SsaOH_wn8hRSUVXogc4iyK4F438DBVoKXnbazG6fLl9Fw1XaQNp_xCDiDkijP5crUJIU0Lre9yMeyuZLQYsh1bRSCy0KPkELil7s9ytsFL1yLJu71i9k5Es17JBpV2ksbtQ8dYcyFphRC29kaEbx8V1NlOkfgVW2WkjEmjHkASZLjJObmclAib3324X95Vz1ssN2N3skqS-RnRydwCQEmCMiI8VWy3eTPoptadLvLjXLm0s6oPN_6trnenTMb4AcloGyOcTIx_1PvHUvx4r4ORAESw2bHAT8kXw8cCeGtmbfsQ09aV6XG8ULraHEUIhhZPr_8ufBltU5veJeIn1-fyhRGqL81sNkakZGKFYZOn2i0DmfvjswcrRfKEq7T0HYzUEZitVe2AcoNqVkMqR_T8Ux4cyrcKiCIZv50rdayAayMJoz4xsK-wvf3JKxrJNVsFb-4TxPWmY8fkomsEhQQlQXlyh1IsVUaNUEBIjie38gukkcMAPcrAipAUkWU9omazbXWl-9gt_FYXC5gq-R4dqZye_ba7U7emEEN8Hyqur-UGXn1BZ0zXnfDHGPsGANVSJdgGSdNDsM8boyub_VaSz0sHvRgULiahjPfzLRV0Ipdcu7a5rjuUXX6YRlpnuPHZy9MeUsugizns0fot--vBox49f3i3n3hik9bVb9VS1exlP1GEJjbhrMWiLMqyQnb1Q9WeViW6_fK-dE36tDf-TG2mfBWW0tFUCR7YW-PryfIXDFEtMcYzqv3Pcz1kV1z-5Bbb_UVyAhwKKxv6X81g6Mjt2QEgxk-OkKYTP4v3jNvy2bl76BKasw6em3bonpZqP7HRDrxTqevpFOEjA002SNO0AAyT2pmAFEwaJFbtEzZOsv0Q5ONL2XAEc21hDL9rtfWuSbaE5qFnSSjXj2D-JvG4LlpIf_zLa53_kAFhkqdsWRklwk0fVBdRKHJxm8Px2-kmCsRp8faJy2cAsJTe67Cx4uYl4vgiGK7q6YXpYerbazFCCfBUGNrsNcMh2BD_ptWkPOsqGsbxqTNGb9gm7cWAnLcsgaa-64mHF0y5mdYIF6E5uR6dmuG557b5nfIGmGw0pCoOyaRtuuMpJLfwNxQ05m1wmMRpKlFOzL4X5d3OXcNGlurdeF-hvM4lPs_RkMLeyi0PtgGHP7bF0HLo3J7ok-bnpj4Nbogm1DLul1W07llL_5nvlEgxC6RLmXD40tEQGqKpAT8HH59aThWa9T738xF056SbvjgAqNbGLj1BAlkOcJtmKKSSmvwYNnbIoBjCFkglazep_U9DNSa2QMOamVfJhOQmIKf6d4o_gpP3RqGn6tKwXhjMmgtUQPg47L1u2XXQtg-wWI=w1491-h969"
  },
  {
    name: "Delivery",
    imgSrc:
      "https://lh3.googleusercontent.com/fife/AMPSemc26rroIrv-XDU9n6z9UTj89Uh_5uD9LIwDhSRH1Sg_8MBULRfCTPxttxt6DaAUKnT0Wy4NRMfqtic71auk_UEZs8sUMvCkWIOnO40IM2tLETAL9iEvQZHFuX56pDvTBmLyCQiLTN3JswYcntywccSQz-wg4TyYXno93waBI5Zr3UohSZS2fMQAFUsSPfC1CkJS16-yNtWd7scEsE4mnoQxcn-GFKKIrP9S7rVaLeWgqkY_CHTL6DmJr2Av-US3mo5hbhxQMjL9IMgmaqt3_3I-I-3XgxQT9SuvQxAEAs5gVJBmNgrl3aQ7k1gRFHEAwapuhrWJSAHZ2U2yGSwjmKEh2vMzqgzlr3AhRvoKcyllS3AS-SCdShNqQiiWXCMeO4cendyFl6AuqVm84IgGGtk2uZK5jQXoKGXbj1ruNI7r-0GD3ZvIfcZMVlEfGIpUpZdukjcbDUWIOWFwkEwYZt1xLOMWRRmEuJ33j_C7EPDIZBJxMnu-ViQYuV3kiP7jI4I0MmsPqlYQk1zIZtjx6n_15zPREAjxhnOlhVodoPJ--_M_4YQvhGQ3Lex8ccerXCXiodF51a2iqeO3U2zlJF11HWcVHeK58ex5CsO3MZx_b3zNpLRY0oCYTwxVL6zVEVu91ViOW3xhlctgAj3Me0NszI-74GsiarEShtQNTDNblbbNrJLNdNpuSAyN38yD8U64AXyfNTf8Mre2OxfksalN-m7t9odlbW5u4n3Qej7bUvEddD6ME-15o8qQkDG7THCeafCR000tmUWTsClA9cRP-pCZ1AsvP7yjR19kaZJ19NR2JaNcAFF_2vJfcK0gBh5wpWWpQLv4mkhRwZKAGLBiDf0KoGo0FQOYVL8sz4JRx2vZZbLWsBQvaevkVFzK7gjL_l4iBU9PirD6SQOHIgDQ5hIaYymQPMRyvg3_f6XifDEX9xB_PAi9RR-M3V-Ct_4sEutgPvXMQd5Oa3AWk7yDES54_1UVkypkoB31VxbK13rW7lwHTXVQOr06sDshVjAoQHUR3tsJFPE4kXFMwFHieEwpTD4MVUs-wJ7NEpXrmqaG0YHSXIFcSXgj7inJgkjmBWNi4r9ecpt59-60EVp4VI338MU7lbR6obfdiec6UD1JsK8ZPlbrqUvp8MVKMAtlQylxACEPNML16i9O79T5GzBQpSYbdrYYjWToo7UYwGs-NnXlAVT78qYDL3Ye5V5_TsMuNSHYN3mvRRBTpsYxKg6OPcweTRDWd3qvkYwDXuozlBs8atktKXkD9tDPG_Xbz7Q9xDinTnuLsM13qkGEHGKQt5SYSDZr5QwxV4Pe1xTy8vMx-b8V62v-YY1wx_A34i2U3KqUdjjw_XJ_YFFGAR0xIHclxQLI2V3Q8PdvG4QfKRawojh4FLGKkcKi1fg06RlAXxG-kKe4Z5m3uSH_2ZNDPVhT1GdoAIQYz9poPbTFbTHM_8tFeE88Z8U6zyxGB70UGpUJ1obYtTVlL_rOMkmLCzPS9AHnG-h9Hxp0z4xm3f6BRN2xXvUQQbAqZuEpE57qox7bLJ9uBuWN9uI5eK0XxZwxysopPjl__mZs1GBt4mf6ATfpgqQ3HFUliW_eeA703lSGljvb4setW8Te_Vz9q9WU2WALY4n4GmBcTYJxeFYOCihilvA=w1491-h969"
  },
  {
    name: "Joom",
    imgSrc:
      "https://lh3.googleusercontent.com/fife/AMPSemd_wzV14P-Hs6tZrYI8BfHNCZActVIKTyxLPDS2h0pW7gNea7VlDKXZ_fsY3TWNeOhp7xrnIbL8skpwKgWazs7MSPUgr40nv2taVFhLeAU4aVqr_Y6L3oGrIqtXrP2UKi3SuL1oOwpSY32f_ZI65NgRITDFCcROEYfTXUvu6NHQaUm3Qtr24V74JpZsMwudvYT4tJP45OzEKOJVGDBxEIGREhodCYI8JL47q91Onrb-LAstPLqWEoF_WXxL_gjgrbZmQxsTggNIvB1Xql2XhZJdlmN05QsciDR2eZ5GTbmCpxxDgENdgBsZF7ShMzOYU7TfWR0YsDADt1IMFDAwcNui49gnFYyyV65nVDIYciSwA107omPZxLZC9ADkupqQ1b91aNLmeyGNqtPUxfdZtrhCDpnAupHmkWUzwPPXkwvqGG2XxgnjvLk8SjM9u6ZjZ9bOnJhrFJJPjkg03DufIUX30lY5EGLu7quw07IL23s0---o_EhoK6wjcXPkKyJMRSea-32fbJ2su9KZBmLUr_5ikUkTJFQlMtKP9dQLhcs0Yb9R9DACxlD3PBDkp9oVSj2e0ftCnj9FqfMGs2OFMw9cle7BNOXhG61NNfRg89Dm1z_vtVnBs-wVrQkdUr2AbsfXxfUhOxSfg2WS_QBykmeMms_6HPyT7pqKPISDMtMSTGcLYo7YNME6BHWFcAfD3omJxejXmLzEny2JkHy2PNwNUO-9Ai4adi8BT2TLvAwBcX4G-K4Lp0SAWp0paO4xPLf7dna1fXNiTQzyZ9872IaI6eShRFWGqWtlOYsdbnhujzRqlFi-cO6-tzBc37Pds-HsuMIq3vBAviOHMl3az2ydWPrOG3A_nCCs_5JuSowXTiKbD_oRN07jMvcLNpzWhwhb3kHIH_oZK1luumGz5tZ6isw7IOINwx905Mer1WLuA5jlLOJPUEnPFzzbj6vIZlc05Du8Rs0pGhERIXlJ6rzVD3EkcpqxgDnLfZhbcZAHiOYpAh8-vOZPngEst1japAV1h_Kk7JYTQomL--Z0MKutwznv0jM3m_PRW9A0fICjrS5Eo8jAD9RMo7CYwk-QAj8-wd7UzrFmA8RyIjzqGdarVBMR-la-DYSrCibOV0EAN1Uc28K-SmWVxOafsvQ4J7r2Tv1LiMn6HFoHleRqhwJt8dVKn5W7CdqfJIo0JAWZdFNShZmejC5_c_E53ruITLCzU5W6T-o54VkUf7UTwyZ7DQDOMNjWvdxOgZrKQeN6YOQ6Bqh5KOW4QsihUeVMAh44tK5OOj441UdPP7EaaratWNFZjd-xRI3PA2zuwmgBri8AZUnf0Hd0Kev2XKFKRglAJvaBkZShFrCJtWghsofJ7ehdPBMXWi3ccyKHQkOAPTSqwZ_zrDylCuXRkjodpMmao0_bn16dwXNVBU9XawDi-2V6no37qXJpl6rb0O7jP7BdgfMoEvuYesxjYtAZuIeab5WydIrSKPJDgqOVBYii9I21vdBbNNZSY6jvw7_sDu2tky1keJmHtWbVF6jPBA3EQiMD_lpq8IZId_V55zaYeDcwNmZQ3nm96zg1fvMdsMXeSvQxdm2K0z8Z_sDPYgC2ZP8Twbctd7_0afk0tTkEpbyxu20NTcHWMdvHs8yI1AHGLG5ng9gnuQA=w1491-h969"
  },
  {
    name: "Amazon",
    imgSrc:
      "https://lh3.googleusercontent.com/fife/AMPSemev4axruBa1x91FQ8qL_N4y7R07AePorqfV3mTRHq5BJXZ3EO2lBI4oOREXO0Aok-d-mLreDDi63Tirqt6Y5t9hzZrAGc7-A8W6m37sQoIfYo0SEvPd8-ivSs7J5XwCv_mVU1tfQeZCmL-W9wLbCtq9utEMn_vZbW3NamUbesjyt-HW8VmSYVrICiszDuARFlUKXKGfzATQIxCImuV3rp_xQs3d2nvxawBNO8xzoOrNsgGTlmkXfKepeCniUgr3fqhTj0z-HrVfVqNmRDoPgdikMxYhvivd5d2wJK69SXU9o6HTtRKrTDQEb9LVV3cWK8RYO0UlgUiKGaCFQlpV_gR53FjK-32k1-_EmmzgX9Yw9AB8QnjQIbsbGabyu4HUUgrA39qElDN1fG9vVrj--ywpYsf_MZV6hdpEuFFOyMstVFLbX3BIxL9k8xYM45Yh2FUcnzaZkDwzwk9FQn4KpnA3LOB3hDjk16crJ0cWAah0Bi9lHKx1sPPGEZynJ52iSCB0r4eI3Ir0PsHaHVGz8VUQ3T3M3iqPPLmhwMLf-mko8NyJildIGZCgl1tqp5gJ9t2vxUel__tXUWwdxZxuE35tBNCTBzzqCq-le4SvYw0EWn47_WaaufyTLAFlOuYoA_Vi7_y3Nxze6zbq9HDYJfR6L9P1dvmYsTw_RbvVDauIEhphqbK3UBvlnYJOc3QvKubyMD4VqYsMfofOgBGLebI5Qj2rekNLbWpm5burCZvTQNJ8S4l5OsSZOPGssWxhaG3g9TsSEbvQDAQkX8mIW4iO7Pj2ouT-C1uK13pkozfB6sit5Io9XJztqlMnAVKolYPjMnphDL0jOtwyD6UbZHW1VRM0JGHjvpQwLRf5wCdIKkEVDqDUTYz7oUe1BEElY_Xg-UL5EmwpNaU8lFyhX9cyogFEyMKh7iYjOZZ4OkUh5cbiTHO_w1pOm57_fMdoO-IFnnNcoscwhfnAp_zB8GDuTb567j5NqLS4sESD4uC9nj0eofOwjKz3Vk4x-UtrqhJbLog7m8WB9TBTLhDGop-wUZaGKo6oZh2wAnFT2mMDqDwEzGg25xP9rqpF7-3Fq7ZbOD1UcQWLryWeLLeY4N5MqvzuuCq446xtfdSDyyXmhI9SeknfYlxM4TSoYP89AMg-KX0v8WYD2KB-LOm8--DokUs2coM_JIgN1yRcQGd0YAR3s7egCratpKgvQFPA-stujbdPE7VsTt5LbIBUyWO_LwV4EK0ZxHsVYWqzG75nEoCPidXHgpEE4Z1BQ1AVMH8dmCthD0oY8w7EXC46vJyxdetGw-dHeEt7QK2oOm9xvJM3pyGPt4-A8LC0L3xcA04uJyuUs9GeKmVwzkI3jIELmHQwfpJgbxwgeQjbJdwMeAUDt93oNzQpwtka4lQcFfWnW3o5VEVvU4VpWIXQZaNAlT6vNIsMKiDM1HDyeICzrxd4EIiVEMoEAVrVgajGRXsivHW3SIodENi6o4er0bxxO3bYkuRQty2z3XebRmHQ_BSLDFNFAdQUmSyETQw3dELXpoN3HB9eW-UpDF8_qJe8ubeh0JVb19E6jp3fG9iwYbB3aB7uhHwvXtAfi59-3WTi7wx7-t-t3wcKv2Eg2xEzIODp0qH970d1EpSBHFu0AqafTSsSJOlph8s=w1491-h969"
  }
];

const ListItem = ({
  item,
  id,
  title,
  handleDelete,
  isNew,
  oneItem,
  handleChange,
  handleCheckboxChange,
  selectedRow,
  setSelectedRow
}) => {
  const deletBtnRef = useRef();
  const isHovered = useHover(deletBtnRef);
  const [modal, setModal] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);

  const handleFreezeObject = (obj) => {
    if (!isFrozen) {
      obj.isFrozen = true;
      setIsFrozen(true);
    } else {
      obj.isFrozen = false;
      setIsFrozen(false);
    }
  };

  return (
    <tr
      onClick={() => setSelectedRow(oneItem)}
      style={{
        backgroundColor:
          selectedRow?.id === oneItem?.id ? "rgba(81, 81, 81, 0.7)" : "white"
      }}
    >
      <td
        style={{ backgroundColor: oneItem.isFrozen ? "#4b4b4b" : "" }}
        onClick={(e) => {
          e.stopPropagation();
          handleFreezeObject(oneItem);
        }}
        className={styles.freezeBtn}
      ></td>
      <td>
        <MyCheckbox
          oneItem={oneItem}
          handleCheckboxChange={(event) => handleCheckboxChange(event, oneItem)}
        />
      </td>
      <td className={styles.item}>
        <EditableText
          isFrozen={isFrozen}
          handleChange={handleChange}
          oneItem={oneItem}
          name={"item"}
          isNew={false}
          text={item}
        />
      </td>
      <td className={styles.id}>
        <EditableText
          isFrozen={isFrozen}
          handleChange={handleChange}
          oneItem={oneItem}
          name={"id"}
          type={"id"}
          isNew={isNew}
          text={id}
        />
      </td>
      <td className={styles.title}>
        <MyModal visible={modal} setVisible={setModal}>
          {companies.map((company) => (
            <img
              title={company.name}
              onClick={(e) => {
                oneItem.company = e.target.name;
                setModal(false);
              }}
              name={company.name}
              key={company.name}
              src={ company.imgSrc}
              alt={company.name}
            />
          ))}
        </MyModal>
        <img
          src={
            companies.find((company) => oneItem.company === company.name).imgSrc
          }
          alt="icon"
          onClick={(e) => setModal((prev) => (prev = !prev))}
        />
        <EditableText
          isFrozen={isFrozen}
          handleChange={handleChange}
          oneItem={oneItem}
          name={"title"}
          isNew={isNew}
          text={title}
        />
      </td>
      <td>
        <button
          ref={deletBtnRef}
          className={styles.deleteBtn}
          title="Удалить строку"
          onClick={() => {
            handleDelete(id, isFrozen);
          }}
        >
          X
        </button>
      </td>
    </tr>
  );
};

export default ListItem;
