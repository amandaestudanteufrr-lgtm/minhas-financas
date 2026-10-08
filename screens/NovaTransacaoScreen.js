// screens/NovaTransacaoScreen.js -> Define o arquivo da tela que permite cadastrar novas receitas ou despesas
import React, { useState } from 'react'; // Importa a biblioteca do React e o ganho (hook) useState para controlar os campos digitados
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, Alert
} from 'react-native'; // Importa os componentes visuais e caixas de alerta do React Native
import { Ionicons } from '@expo/vector-icons'; // Importa a biblioteca de ícones para setas, categorias e botão de salvar
import { cores, espacamento, raio } from '../theme'; // Importa o arquivo de temas global com cores, espaçamentos e bordas arredondadas

// Lista fixa contendo as categorias disponíveis para escolha (com seus identificadores, rótulos e ícones)
const CATEGORIAS = [
  { id: 'alimentacao', label: 'Alimentação', icone: 'restaurant' },
  { id: 'transporte', label: 'Transporte', icone: 'car' },
  { id: 'saude', label: 'Saúde', icone: 'medical' },
  { id: 'lazer', label: 'Lazer', icone: 'game-controller' },
  { id: 'moradia', label: 'Moradia', icone: 'home' },
  { id: 'salario', label: 'Salário', icone: 'cash' },
  { id: 'outros', label: 'Outros', icone: 'ellipsis-horizontal-circle' },
];

export function NovaTransacaoScreen({ navigation }) { // Cria e exporta o componente da tela do formulário, recebendo a navegação por props
  const [descricao, setDescricao] = useState(''); // Estado que guarda o texto digitado na descrição
  const [valor, setValor] = useState(''); // Estado que guarda o valor numérico digitado
  const [tipo, setTipo] = useState('despesa'); // Estado que guarda o tipo selecionado ('receita' ou 'despesa', com padrão 'despesa')
  const [categoria, setCategoria] = useState('outros'); // Estado que guarda a categoria escolhida (com padrão 'outros')

  // Função disparada ao clicar no botão de salvar transação
  const salvar = () => {
    // Validação 1: Verifica se o campo de descrição está vazio
    if (!descricao.trim()) {
      Alert.alert('Atenção', 'Digite uma descrição para a transação.');
      return;
    }
    
    // Converte a vírgula do teclado para ponto para o JavaScript conseguir transformar em número decimal
    const valorNumerico = parseFloat(valor.replace(',', '.'));
    
    // Validação 2: Verifica se o valor é inválido, vazio ou menor/igual a zero
    if (!valor || isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Atenção', 'Digite um valor válido maior que zero.');
      return;
    }

    // Cria o objeto completo da nova transação com ID único baseado no tempo atual e data formatada
    const novaTransacao = {
      id: Date.now().toString(),
      descricao: descricao.trim(),
      valor: valorNumerico,
      tipo,
      categoria,
      data: new Date().toLocaleDateString('pt-BR'),
    };

    // Navega de volta para o Dashboard e envia a nova transação através dos parâmetros internos do Stack
    navigation.navigate('Dashboard', {
      screen: 'DashboardHome',
      params: { novaTransacao },
    });

    // Reseta o formulário limpando todos os campos para o estado inicial
    setDescricao('');
    setValor('');
    setTipo('despesa');
    setCategoria('outros');
  };

  return (
    // Área rolável que permite ver os campos e mantém os toques ativos mesmo quando o teclado virtual está aberto
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.tituloPagina}>Nova Transação</Text>

      {/* Rótulo e botões para escolher o tipo da transação (Receita ou Despesa) */}
      <Text style={styles.label}>Tipo</Text>
      <View style={styles.seletor}>
        {['receita', 'despesa'].map(t => (
          <TouchableOpacity
            key={t}
            style={[
              styles.botaoTipo,
              tipo === t && { backgroundColor: t === 'receita' ? cores.receita : cores.despesa }
            ]}
            onPress={() => setTipo(t)}
          >
            <Ionicons
              name={t === 'receita' ? 'arrow-up' : 'arrow-down'}
              size={18}
              color={tipo === t ? '#fff' : '#555'}
            />
            <Text style={[styles.textoTipo, tipo === t && { color: '#fff' }]}>
              {t === 'receita' ? 'Receita' : 'Despesa'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Rótulo e campo de texto para digitar a descrição */}
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Ex: Supermercado, Salário..."
        maxLength={50}
        returnKeyType="next"
      />

      {/* Rótulo e campo de texto numérico para digitar o valor (R$) */}
      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        placeholder="0,00"
        keyboardType="decimal-pad"
        returnKeyType="done"
      />

      {/* Rótulo e lista de botões em formato de chips para escolher a categoria */}
      <Text style={styles.label}>Categoria</Text>
      <View style={styles.categorias}>
        {CATEGORIAS.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.chipCategoria,
              categoria === cat.id && styles.chipAtivo
            ]}
            onPress={() => setCategoria(cat.id)}
          >
            <Ionicons
              name={cat.icone}
              size={16}
              color={categoria === cat.id ? '#fff' : cores.subtexto}
            />
            <Text style={[
              styles.textoChip,
              categoria === cat.id && { color: '#fff' }
            ]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão principal para salvar a transação e acionar a validação */}
      <TouchableOpacity style={styles.botaoSalvar} onPress={salvar} activeOpacity={0.8}>
        <Ionicons name="checkmark" size={22} color="#fff" />
        <Text style={styles.textoBotao}>Salvar Transação</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Objeto contendo todos os estilos visuais da tela de cadastro
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo, padding: espacamento.md }, // Fundo geral e espaçamento interno
  tituloPagina: {
    fontSize: 22, fontWeight: 'bold', color: cores.texto,
    marginTop: espacamento.lg, marginBottom: espacamento.lg,
  }, // Estilo do título principal da página
  label: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: espacamento.xs }, // Estilo dos rótulos dos campos
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: raio.sm,
    padding: 12, fontSize: 16, marginBottom: espacamento.md,
    backgroundColor: '#fff',
  }, // Estilo das caixas de texto de digitação (com bordas e fundo branco)
  seletor: { flexDirection: 'row', gap: 12, marginBottom: espacamento.md }, // Organiza os botões de tipo lado a lado
  botaoTipo: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, padding: 12, borderRadius: raio.sm,
    borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff',
  }, // Estilo individual de cada botão de tipo (Receita/Despesa)
  textoTipo: { fontSize: 15, fontWeight: '600', color: '#555' }, // Texto do tipo desmarcado
  categorias: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: espacamento.lg }, // Organiza os chips de categoria quebrando linha se necessário
  chipCategoria: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingVertical: 6, paddingHorizontal: 12,
    borderRadius: raio.pill, borderWidth: 1, borderColor: '#ddd',
    backgroundColor: '#fff',
  }, // Estilo visual de cada tag de categoria em formato de pílula
  chipAtivo: { backgroundColor: cores.primaria, borderColor: cores.primaria }, // Cor aplicada quando a categoria está selecionada
  textoChip: { fontSize: 13, color: cores.subtexto }, // Texto da categoria
  botaoSalvar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: cores.primaria, padding: 16,
    borderRadius: raio.md, marginBottom: espacamento.xl,
  }, // Estilo do botão grande de salvar no final da tela
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: '700' }, // Texto em negrito do botão de salvar
});