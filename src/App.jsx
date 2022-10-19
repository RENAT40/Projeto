
    import { EditIcon, DeleteIcon } from "@chakra-ui/icons"; //icones prontos do chakra
    import {
        Box,
        Flex,
        Button,
        useDisclosure,
        Table,
        Thead,
        Tr,
        Th,
        Tbody,
        Td,
        useBreakpointValue,
    } from "@chakra-ui/react"; //itens

    import { useEffect, useState } from "react"; //react
    import ModalComp from "./components/ModalComp"; 



      const App = () => {
              const { isOpen, onOpen, onClose } = useDisclosure(); //controle do modal
              const [data, setData] = useState([]);
              const [dataEdit, setDataEdit] = useState({});

              const isMobile = useBreakpointValue({
                  base: true,
                  lg: false,
              });

              useEffect(() => {
                  const db_costumer = localStorage.getItem("cad_cliente") //editar DB
                    ? JSON.parse(localStorage.getItem("cad_cliente")) //converte os dados para JSON ou
                    : [];                                             //retorna vazio

                  setData(db_costumer); //setar os dados coletados
              }, [setData]);

              const handleRemove = (email) => {
                  const newArray = data.filter((item) => item.email !== email); //filtro para ver se o email passado é diferente do recebido

                  setData(newArray); //se for diferente irá setar o novo email

                  localStorage.setItem("cad_cliente", JSON.stringify(newArray));
              };

              return (
                    <Flex
                      h="100vh"
                      align="center"
                      justify="center"
                      fontSize="20px"
                      fontFamily="poppins">
                    
                      <Box maxW={1100} w="100%" h="100vh" py={50} px={2}>
                            <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
                              NOVO CADASTRO
                            </Button>

                            <Box overflowY="auto" height="100%">
                                <Table marginTop="9">
                                      <Thead>
                                            <Tr> 
                                              <Th maxW={isMobile ? 5 : 100} fontSize="25px"> 
                                                Nome
                                              </Th>
                                              <Th maxW={isMobile ? 5 : 100} fontSize="25px"> 
                                                Idade
                                              </Th>
                                              <Th maxW={isMobile ? 5 : 100} fontSize="25px">
                                                EMail
                                              </Th>
                                              <Th p={0}></Th>
                                              <Th p={0}></Th>
                                              <Th p={0}></Th>
                                            </Tr>
                                      </Thead>

                                      <Tbody>
                                            {data.map(({ name, email, idade }, index) => (
                                              <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                                                <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                                                <Td maxW={isMobile ? 5 : 100}>{idade}</Td>
                                                <Td maxW={isMobile ? 5 : 100}>{email}</Td>
                                                <Td p={0}>
                                                  <EditIcon
                                                    fontSize={20}
                                                    onClick={() => [
                                                      setDataEdit({ name, email, idade, index }),
                                                      onOpen(),
                                                    ]}
                                                  />
                                                </Td>
                                                <Td p={0}>
                                                  <DeleteIcon
                                                    fontSize={20}
                                                    onClick={() => handleRemove(email)}
                                                  />
                                                </Td>
                                              </Tr>
                                            ))}
                                          </Tbody>
                                </Table>
                            </Box>

                            </Box>
                            {isOpen && (
                              <ModalComp
                                isOpen={isOpen}
                                onClose={onClose}
                                data={data}
                                setData={setData}
                                dataEdit={dataEdit}
                                setDataEdit={setDataEdit}
                              />
                      )}
                    </Flex>
              );
      };

export default App;
