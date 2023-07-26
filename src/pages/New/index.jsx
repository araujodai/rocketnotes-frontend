import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { Section } from "../../components/Section";
import { NoteItem } from "../../components/NoteItem";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";

import { api } from "../../services/api";

import { Container, Form } from "./styles";


export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  };

  function handleAddLink() {
    setLinks(prevState => [...prevState, newLink]);
    setNewLink("");
  };

  function handleRemoveLink(deleted) {
    setLinks(prevState => prevState.filter(link => link !== deleted));
  };

  function handleAddTag() {
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
  };

  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag !== deleted));
  };

  async function handleNewNote() {
    if(!title) {
      return alert("Digite um título.");
    }

    if(newLink) {
      return alert('Existe um link pendente, clique em "+" para adicionar ou remova para continuar.');
    } 

    if(newTag) {
      return alert('Existe um marcador pendente, clique em "+" para adicionar ou remova para continuar.');
    } 

    // if (newLink == "" || newTag == "") {
    //   return alert("Links e marcadores são obrigatórios, adicione ao menos um em cada para continuar.");
    // };
    
    await api.post("/notes", {
      title,
      description,
      tags,
      links
    });

    alert("Nota criada com sucesso!");
    navigate(-1);
  };

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText 
              title="voltar" 
              onClick={handleBack} 
            />
          </header>

          <Input 
            placeholder="Título" 
            onChange={e => setTitle(e.target.value)}
          />

          <TextArea 
            placeholder="Observações" 
            onChange={e => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {
              links.map((link, index) => (
                <NoteItem 
                  key={String(index)}
                  value={link}
                  onClick={() => handleRemoveLink(link)}
              />
              ))
            }
            <NoteItem 
              isNew 
              placeholder="Novo link" 
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              //onClick={handleAddLink}
              onClick={() => newLink == "" ? alert("Não é possível adicionar um link vazio.") : handleAddLink()}
            />
          </Section>

          <Section title="Marcadores" class>
            <div className="tags">
              {
                tags.map((tag, index) => (
                  <NoteItem 
                    key={String(index)}
                    value={tag} 
                    onClick={() => handleRemoveTag(tag)}
                  />
                ))
              }
              <NoteItem 
                isNew 
                placeholder="Nova tag" 
                onChange={ e => setNewTag(e.target.value)}
                value={newTag}
                //onClick={handleAddTag}
                onClick={() => newTag == "" ? alert("Não é possível adicionar um marcador vazio.") : handleAddTag()}
              />
            </div>
          </Section>

          <Button 
            title="Salvar" 
            onClick={handleNewNote}
          />

        </Form>
      </main>

    </Container>
  );
};