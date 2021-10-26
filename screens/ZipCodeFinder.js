import React, { useCallback, useEffect, useState } from "react";
import { Button, FlatList, TextInput, Text } from "react-native";
import Padding from "../components/Padding";
import Row from "../components/Row";
import axios from "axios";
import AddressItem from "../components/AddressItem";

function ZipCodeFinder() {
  const [keyword, setKeyword] = useState("");
  const [list, setList] = useState([]);

  const search = useCallback(() => {
    axios
      .get("https://www.juso.go.kr/addrlink/addrLinkApi.do", {
        params: {
          confmKey: "devU01TX0FVVEgyMDIxMTAyMzE4NTcyMjExMTc5MTU=",
          currentPage: 1,
          countPerPage: 100,
          keyword,
          resultType: "json",
        },
      })
      .then((res) => {
        setList(res.data.results.juso);
      })
      .catch(console.warn);
  }, [keyword, list]);

  return (
    <>
      <Padding style={{ flex: 1 }}>
        <Row>
          <TextInput
            style={{ flex: 1 }}
            value={keyword}
            onChangeText={(text) => setKeyword(text)}
          />
          <Button title="검색" onPress={search} />
        </Row>
        <FlatList
          data={list}
          renderItem={(item) => (
            <>
              <AddressItem item={item.item} />
            </>
          )}
          keyExtractor={(item) => item.rnMgtSn + item.roadAddr}
          style={{ flex: 1 }}
        />
      </Padding>
    </>
  );
}

export default ZipCodeFinder;
