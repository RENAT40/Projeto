
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
  } from "@chakra-ui/react";
  import { useState } from "react";


const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {

        const [name, setName] = useState(dataEdit.name || "");
        const [idade, setIdade] = useState(dataEdit.idade || "");
        const [email, setEmail] = useState(dataEdit.email || "");

        const handleSave = () => {
            if (!name || !idade || !email) return;

            if (emailAlreadyExists()) {
                return alert("Este email já foi cadastrado :O"); //avisar que o email já foi cadastrado
            }

            if (Object.keys(dataEdit).length) {
                data[dataEdit.index] = { name, email, idade}; //Mudar os dados cadastrados
            }

            const newDataArray = !Object.keys(dataEdit).length
                ? [...(data ? data : []), { name, idade, email }]
                : [...(data ? data : [])];

            localStorage.setItem("cad_cliente", JSON.stringify(newDataArray)); //Passar os dados para o storage

            setData(newDataArray);

            onClose(); //fechar modal

        };

        const emailAlreadyExists = () => {
            if (dataEdit.email !== email && data?.length) {
              return data.find((item) => item.email === email);
            }
        
            return false;
        };

        return (
            <>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Cadastro de clientes!</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl display="flex" flexDir="column" gap={4}>
                            <Box>
                                <FormLabel>Nome</FormLabel>
                                <Input
                                  type="text"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                            </Box>

                            <Box>
                                <FormLabel>Idade</FormLabel>
                                <Input
                                  type="number"
                                  value={idade}
                                  onChange={(e) => setIdade(e.target.value)}
                                  max="3"
                                  min="1"
                                />
                            </Box>

                            <Box>
                                <FormLabel>Email</FormLabel>
                                <Input
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                            </Box>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter justifyContent="start">
                            <Button colorScheme="green" mr={3} onClick={handleSave}>
                                SALVAR DADOS!
                            </Button>

                            <Button colorScheme="red" onClick={onClose}>
                                CANCELAR
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
};

export default ModalComp;